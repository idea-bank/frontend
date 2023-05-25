import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { RawNodeDatum } from "react-d3-tree";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const Tree = dynamic(() => import("react-d3-tree"), { ssr: false });

type DefaultTranslate = { x: number; y: number };
type Dimensions = { width: number; height: number };
type Translate = { x: number; y: number };
type ContainerRef = (elem: HTMLElement | null) => void;

const useCenteredTree = (
  defaultTranslate: DefaultTranslate = { x: 0, y: 0 }
): [Dimensions | undefined, Translate, ContainerRef] => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState<Dimensions>();

  const containerRef = useCallback<ContainerRef>((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: 200 });
    }
  }, []);

  return [dimensions, translate, containerRef];
};

const renderMaterialCardNode = ({
  nodeDatum,
  onNodeClick,
  foreignObjectProps,
  id,
}) => (
  <g transform={`translate(${-120},${-225})`} onClick={onNodeClick}>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <Card
        sx={{
          border: 2,
          bgcolor: "#f1f1f1",
          borderColor:
            nodeDatum.name ===
            `${decodeURIComponent(id[0])}/${decodeURIComponent(id[1])}`
              ? "#fc6805"
              : "black",
        }}
      >
        <CardHeader
          titleTypographyProps={{
            fontSize: 16,
            textAlign: "center",
          }}
          title={nodeDatum.name}
        ></CardHeader>
        <CardMedia
          sx={{ height: 200, width: 200, objectFit: "fill", borderRadius: 0.5 }}
          component="img"
          image={nodeDatum.imageUrl}
        />
      </Card>
    </foreignObject>
  </g>
);

interface TreeData extends RawNodeDatum {
  children?: TreeData[];
  imageUrl?: string;
}

function mapLineageToTreeData(lineage: any): TreeData {
  const keys = Object.keys(lineage);
  const name = keys[0]; // The first key in the lineage object represents the name
  const children = lineage[name].children;

  if (children && Array.isArray(children)) {
    return {
      name,
      children: children.map((child: any) => mapLineageToTreeData(child)),
    };
  } else {
    return {
      name: lineage,
      children: [],
    };
  }
}

interface LineageResponse {
  status_code: number;
  msg: string;
  lineage: TreeData;
}

const Lineage = () => {
  const [treeData, setTreeData] = useState<TreeData>({} as TreeData);

  const [loading, setLoading] = useState(true);

  const addImageUrlToNode = (treePointer): Promise<void>[] => {
    const stack = [treePointer]; // Create a stack to store nodes to be processed
    const promises: Promise<void>[] = []; // Create an array to store fetch promises

    while (stack.length > 0) {
      const currentNode = stack.pop(); // Get the next node from the stack

      if (currentNode.name) {
        const promise = new Promise<void>((resolve, reject) => {
          fetch(
            `https://concepts-service-n5ey5.ondigitalocean.app/concepts/${currentNode.name}`
          )
            .then((res) => res.json())
            .then((data) => {
              setTreeData((prevTreeData) => {
                const updatedTreeData = { ...prevTreeData };
                const nodeToUpdate = findNode(
                  updatedTreeData,
                  currentNode.name
                );
                if (nodeToUpdate) {
                  nodeToUpdate.imageUrl = data.items[0].image_url;
                }
                return updatedTreeData;
              });
              resolve();
            })
            .catch(reject);
        });

        promises.push(promise);
      }

      if (currentNode.children) {
        // Add children to the stack in reverse order to process them in the correct order
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          stack.push(currentNode.children[i]);
        }
      }
    }

    return promises; // Wait for all fetch requests to complete
  };
  const findNode = (node: TreeData, name: string): TreeData | undefined => {
    if (node.name === name) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const foundNode = findNode(child, name);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return undefined;
  };

  const fetchLineage = async () => {
    const id = window.location.href.split("/lineage/")[1].split("/");
    setId(id);
    try {
      fetch(
        `https://concepts-service-n5ey5.ondigitalocean.app/concepts/${id[0]}/${id[1]}/lineage`
      )
        .then((res) => res.json())
        .then(async (data: LineageResponse) => {
          const treeData = mapLineageToTreeData(data.lineage);
          setTreeData(treeData);
          const waitForImages = addImageUrlToNode(treeData);
          Promise.all(waitForImages).then(() => setLoading(false));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLineage();
  }, []);

  const [dimensions, translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 300 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  const [id, setId] = useState<String[]>([]);
  const router = useRouter();
  /* node.data.name */
  return (
    <Paper>
      <Typography variant="h2" sx={{ marginLeft: 2 }}>
        Idea Lineage
      </Typography>
      <div
        id="treeWrapper"
        style={{ width: "100%", height: "100vh" }}
        ref={containerRef}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 2,
              paddingBottom: 6,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Tree
            data={treeData}
            translate={translate}
            nodeSize={nodeSize}
            orientation="vertical"
            pathFunc="step"
            collapsible={false}
            zoom={0.7}
            separation={{ siblings: 2, nonSiblings: 2 }}
            renderCustomNodeElement={(rd3tProps) =>
              renderMaterialCardNode({ ...rd3tProps, foreignObjectProps, id })
            }
            onNodeClick={(node) => router.push(`/idea/${node.data.name}`)}
          />
        )}
      </div>
    </Paper>
  );
};

export default Lineage;
