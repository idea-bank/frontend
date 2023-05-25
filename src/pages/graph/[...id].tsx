import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";

import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { Network, Node, Edge, Data, Options } from "vis-network";
import { useIsLarge } from "@/hooks/media-queries";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #8e8e8e",
  boxShadow: 24,
  p: 4,
};

type Part = {
  parent: string;
  child: string;
};

export default function ComponentGraph() {
  const graphContainerRef = useRef(null);
  const [nodeClicked, setNodeClicked] = useState(0);
  const [graphData, setGraphData] = useState<Data>({} as Data);
  const isDesktop = useIsLarge();

  const { register, setValue, handleSubmit } = useForm<Part>();

  function createGraph(container, graphData: Data) {
    const options: Options = {
      physics: false,
      interaction: {
        dragNodes: false,
      },
      layout: {
        randomSeed: 1,
      },
      nodes: {
        color: "#b0b0b0",
        shape: "circle",
        font: {
          color: "#ffffff",
        },
      },
    };

    const network = new Network(container, graphData, options);
    network.on("selectNode", function (event) {
      if (Array.isArray(graphData.nodes)) {
        try {
          const index = graphData.nodes.findIndex(
            (node) => node.id === event.nodes[0]
          );
          if (index !== -1) {
            setValue("parent", graphData.nodes[index].label!);
          }
        } catch {
          console.log("Out of bounds");
        }
      }
    });
    return network;
  }
  const fetchGraphData = async () => {
    const id = window.location.href.split("/graph/")[1].split("/");
    try {
      const response = await fetch(
        `https://concepts-service-n5ey5.ondigitalocean.app/concepts/${id[0]}/${id[1]}`
      );
      if (response.ok) {
        const data = await response.json();
        setGraphData(data.items[0].diagram);
        if (Object.keys(data.items[0].diagram).length === 0) {
          setGraphData({
            nodes: [],
            edges: [],
          });
        }
      } else {
        throw new Error(
          `Failed to submit form data. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGraphData();
  }, []);
  useEffect(() => {
    if (graphContainerRef.current) {
      createGraph(graphContainerRef.current, graphData);
    }
  }, [graphData]);

  const openModal = () => {
    setOpen(true);
  };

  const addPart = (data: Part) => {
    if (data.parent === "" && data.child === "") {
    } else if (data.parent === "") {
      setGraphData(() => {
        const newGraphData = { ...graphData };
        if (Array.isArray(newGraphData.nodes)) {
          const newId = newGraphData.nodes.length + 1;

          newGraphData.nodes.push({ id: newId, label: data.child });
        }
        return newGraphData;
      });
    } else {
      setGraphData(() => {
        const newGraphData = { ...graphData };
        if (
          Array.isArray(newGraphData.nodes) &&
          Array.isArray(newGraphData.edges)
        ) {
          const newId = newGraphData.nodes.length + 1;
          const parentId =
            newGraphData.nodes.findIndex((node) => node.label === data.parent) +
            1;
          if (parentId === -1) {
            return newGraphData;
          }
          newGraphData.nodes.push({ id: newId, label: data.child });
          newGraphData.edges.push({ from: parentId, to: newId });
        }
        return newGraphData;
      });
    }

    handleClose();
    setValue("parent", "");
    setValue("child", "");
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Paper sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form
            onSubmit={handleSubmit(addPart)}
            style={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Component
            </Typography>
            <Typography
              id="modal-modal-description"
              paragraph={true}
              color="text.secondary"
            >
              Leave parent empty when adding standalone component
            </Typography>
            <TextField
              label="Parent Part"
              variant="outlined"
              helperText="The pre-existing part"
              sx={{ marginBottom: 1 }}
              {...register("parent")}
            />
            <TextField
              label="Child Part"
              variant="outlined"
              helperText="The new part"
              sx={{ marginBottom: 1 }}
              {...register("child")}
            />
            <Button variant="contained" type="submit">
              Add Part
            </Button>
          </form>
        </Box>
      </Modal>
      <Typography variant="h3" sx={{ marginLeft: 2, paddingTop: 2 }}>
        Components
      </Typography>
      {graphData.nodes && graphData.nodes.length === 0 ? (
        <Typography variant="h5" sx={{ marginLeft: 2, paddingTop: 2 }}>
          No components yet. Click the Add button in the bottom right to get
          started.
        </Typography>
      ) : (
        <div
          ref={graphContainerRef}
          style={{ flex: 1, height: "100%", overflow: "auto" }}
        ></div>
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: isDesktop ? 20 : 70, right: 20 }}
        onClick={() => {
          openModal();
        }}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
}
