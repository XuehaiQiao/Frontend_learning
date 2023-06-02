function updateState(state) {
    const updatedState = JSON.parse(JSON.stringify(state));
  
    // Update 'state.children[0].children[0].path[1]'
    updatedState.children[0].children[0].path[1] = "004";
  
    // Update 'state.children[1].children[1].children[0].path[2]'
    updatedState.children[1].children[1].children[0].path[2] = "006";
  
    return updatedState;
  }
  
  // Example usage:
  const state = {
    id: "001",
    type: "A",
    value: "aaaaa",
    "data:": {},
    path: ["001"],
    children: [
      {
        id: "003",
        type: "A",
        value: "aaaaa",
        "data:": {},
        path: ["001", "003"],
        children: [
          {
            id: "002",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "003", "002"],
            children: [],
          },
        ],
      },
      {
        id: "004",
        type: "A",
        value: "aaaaa",
        "data:": {},
        path: ["001", "004"],
        children: [
          {
            id: "005",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "004", "005"],
            children: [],
          },
          {
            id: "005",
            type: "A",
            value: "aaaaa",
            "data:": {},
            path: ["001", "004", "005"],
            children: [
              {
                id: "002",
                type: "A",
                value: "aaaaa",
                "data:": {},
                path: ["001", "004", "005", "002"],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  
  const updatedState = updateState(state);
  console.log(updatedState);