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
}) => (
  <g transform={`translate(${-120},${-225})`} onClick={onNodeClick}>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <Card sx={{ border: 1, bgcolor: "#f3f3f3" }}>
        <CardHeader
          titleTypographyProps={{
            fontSize: 16,
            textAlign: "center",
          }}
          title={nodeDatum.name}
        ></CardHeader>
        <CardMedia
          sx={{ height: 200, width: 200, objectFit: "fill" }}
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

  const addImageUrlToNode = async (treePointer: TreeData): Promise<void> => {
    if (treePointer.children !== undefined) {
      for (const child of treePointer.children) {
        addImageUrlToNode(child);
      }
    }

    if (treePointer.name) {
      return new Promise<void>((resolve, reject) => {
        fetch(
          `https://concepts-service-n5ey5.ondigitalocean.app/concepts/${treePointer.name}`
        )
          .then((res) => res.json())
          .then((data) => {
            setTreeData((prevTreeData) => {
              const updatedTreeData = { ...prevTreeData }; // Create a copy of the previous treeData
              const nodeToUpdate = findNode(updatedTreeData, treePointer.name); // Find the node to update in the copied treeData
              if (nodeToUpdate) {
                nodeToUpdate.imageUrl = data.items[0].image_url; // Set the imageUrl
              }
              return updatedTreeData; // Return the updated treeData
            });
            resolve();
          });
      });
    }
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
    setLoading(true);
    const id = window.location.href.split("/lineage/")[1].split("/");
    try {
      fetch(
        `https://concepts-service-n5ey5.ondigitalocean.app/concepts/${id[0]}/${id[1]}/lineage`
      )
        .then((res) => res.json())
        .then(async (data: LineageResponse) => {
          const treeData = mapLineageToTreeData(data.lineage);
          setTreeData(treeData);
          await addImageUrlToNode(treeData);
          setLoading(false);
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
  const router = useRouter();
  /* node.data.name */
  return (
    <Paper>
      <Typography variant="h2" sx={{ marginLeft: 2 }}>
        Idea Lineage
      </Typography>
      <div
        id="treeWrapper"
        style={{ width: "100vw", height: "100vh" }}
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
              renderMaterialCardNode({ ...rd3tProps, foreignObjectProps })
            }
            onNodeClick={(node) => router.push(`/idea/${node.data.name}`)}
          />
        )}
      </div>
    </Paper>
  );
};

export default Lineage;
