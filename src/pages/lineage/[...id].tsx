import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
const Tree = dynamic(() => import("react-d3-tree"), { ssr: false });
const myTreeData = {
  name: "Main Idea",
  children: [
    {
      name: "Sub Idea 1",
      children: [
        {
          name: "Sub Idea 1.1",
          children: [
            {
              name: "Sub Idea 1.1.1",
            },
            {
              name: "Sub Idea 1.1.2",
            },
          ],
        },
        {
          name: "Sub Idea 1.2",
          children: [
            {
              name: "Sub Idea 1.2.1",
            },
            {
              name: "Sub Idea 1.2.2",
            },
          ],
        },
      ],
    },
    {
      name: "Sub Idea 2",
      children: [
        {
          name: "Sub Idea 2.1",
        },
        {
          name: "Sub Idea 2.2",
        },
        {
          name: "Sub Idea 2.3",
          children: [
            {
              name: "Sub Idea 2.3.1",
            },
            {
              name: "Sub Idea 2.3.2",
            },
            {
              name: "Sub Idea 2.3.3",
              children: [
                {
                  name: "Sub Idea 2.3.3.1",
                },
                {
                  name: "Sub Idea 2.3.3.2",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

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
      <Card sx={{ border: 1 }}>
        <CardHeader
          titleTypographyProps={{ fontSize: 16, textAlign: "center" }}
          title={nodeDatum.name}
        ></CardHeader>
        <CardMedia
          sx={{ maxHeight: 200, maxWidth: 200 }}
          component="img"
          image={"https://dummyimage.com/200x200/bdbdbd/ffffff"}
        />
      </Card>
    </foreignObject>
  </g>
);

const Lineage = () => {
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
        <Tree
          data={myTreeData}
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
          onNodeClick={(node) => router.push("/idea/1")}
        />
      </div>
    </Paper>
  );
};

export default Lineage;
