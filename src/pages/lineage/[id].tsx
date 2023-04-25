import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import Tree from "react-d3-tree";

const myTreeData = {
  name: "Main Idea",
  children: [
    {
      name: "Sub Idea 1",
      children: [
        {
          name: "Sub Idea 1.1",
        },
        {
          name: "Sub Idea 1.2",
        },
      ],
    },
    {
      name: "Sub Idea 2",
    },
  ],
};
type DefaultTranslate = { x: number; y: number };
type Dimensions = { width: number; height: number };
type Translate = { x: number; y: number };
type ContainerRef = (elem: HTMLElement | null) => void;

const useCenteredTree = (
  defaultTranslate: DefaultTranslate = { x: 0, y: 0 },
): [Dimensions | undefined, Translate, ContainerRef] => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState<Dimensions>();

  const containerRef = useCallback<ContainerRef>((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: 50 });
    }
  }, []);

  return [dimensions, translate, containerRef];
};

const Lineage = () => {
  const [dimensions, translate, containerRef] = useCenteredTree();
  return (
    <>
    <Paper>
      <Typography variant="h2" sx={{marginLeft: 2}}>Idea Lineage</Typography>
      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }} ref={containerRef}>
        <Tree
          data={myTreeData}
          translate={translate}
          orientation="vertical"
          pathFunc="step"
          separation={{siblings: 1.5}}
          />
      </div>
    </Paper>
    </>
  );
};

export default Lineage;
