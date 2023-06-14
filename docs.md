# Final Frontend Documentation
This document will highlight some of the key features and documentation completed by Team Idea Bank.

## Project 
This project was made in Next.js 12 using Typescript and the page router.
Most UI elements were implemented using React MUI 5.

This app will no longer be functional due to the backend API being delisted. This app was hosted on Vercel and will be taken down due to the 
previous reasoning.

Refer to Figma for visuals

## Features
### Scrollable Feed
[/pages/feed.tsx](https://github.com/idea-bank/frontend-web-app/blob/main/src/pages/feed.tsx)

Social Media like feed filled with ideas.
- Ideas contain an image, likes, title, description and author
- Infinitely scrollable implemented using the Intersection Observer API
- Snap to scroll (mobile)


### Link Idea
Link idea is a similar concept to GitHub forks. 

Upon creation, idea B can be linked to idea A to duplicate idea A. In this example, idea A is the 
parent and idea B is the child. Any further links from idea A, will be the sibling of B.


### Lineage
[/pages/lineage/...id.tsx](https://github.com/idea-bank/frontend-web-app/blob/main/src/pages/lineage/%5B...id%5D.tsx)

Visualization of the an idea's ancestry, detailing an idea's parent, it's siblings and children.
- Siblings on the same row 
- Parent one row above
- Children x rows below

#### Implementation
Implemented using [React D3 Tree](https://www.npmjs.com/package/react-d3-tree) 


##### Tree Config
```
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
```
##### Tree Structure
```
interface TreeData extends RawNodeDatum {
  children?: TreeData[];
  imageUrl?: string;
}

interface RawNodeDatum {
    name: string;
    attributes?: Record<string, string | number | boolean>; // Leave out
    children?: RawNodeDatum[];
}
```

##### Custom Node
```
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
```

### Component Graph
#### Intention
A network graph to visualize and crowdsource the composition or blueprint of a single idea.
For example, one user could design a Car to made up of an Engine, Transmission, 4 Wheels and a body.
Another user, could add a sunroof to the network.

The end goal was to have users upvoting and downvoting each individual part and some way of visually indicating which parts are 
highly favored.

#### Implementation
[/pages/graph/id.tsx](https://github.com/idea-bank/frontend-web-app/blob/main/src/pages/graph/%5B...id%5D.tsx)

Currently, there is a basic visualization of the graph using [vis-network](https://visjs.github.io/vis-network/docs/network/) and the ability to add components.

##### Graph Structure 
```
"diagram": { 
  "nodes" : [
    { "id": 1, "label": "Board"},
    { "id": 2, "label": "Truck"},
    { "id": 3, "label": "Truck 2"},
    { "id": 4, "label": "Wheel 1"},
    { "id": 5, "label": "Wheel 2"},
    { "id": 6, "label": "Wheel 3"}
    { "id": 7, "label": "Wheel 4"}

  ];
"edges": [
    { "from": 1, "to": 2 },
    { "from": 1, "to": 3 },
    { "from": 2, "to": 4 },
    { "from": 2, "to": 5 },
    { "from": 3, "to": 6 },
    { "from": 3, "to": 7 }
      ];

  "data" {
    "nodes": nodes,
    "edges": edges,
  };
```



### Less Notable Features
- Profile
- Add Idea
- Login
- Sign up

### Feature Road Map
- Idea Equity distribution
- Component Graph enhancements
- Comment System
- Messaging System
