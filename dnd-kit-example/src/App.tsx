import { useState } from "react";
import "./App.css";
import { SortableItem } from "./SortableItem";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const dummyOptionData = [
  { value: "", label: "Select..." },
  {
    value: "1",
    label: "Task 1",
  },
  {
    value: "2",
    label: "Task 2",
  },
  {
    value: "3",
    label: "Task 3",
  },
  {
    value: "4",
    label: "Task 4",
  },
];

function App() {
  const [selectItems, setSelectItems] = useState([
    { id: "1", value: "" },
    { id: "2", value: "" },
    { id: "3", value: "" },
    { id: "4", value: "" },
  ]);

  const handleClick = () => {
    setSelectItems((prevItems) => {
      return [
        ...prevItems,
        { id: (prevItems.length + 1).toString(), value: "" },
      ];
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    console.log({ active, over });
    if (active.id !== over.id) {
      setSelectItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleChange = (id: string, value: HTMLSelectElement["value"]) => {
    setSelectItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      const newItems = [...prevItems];
      newItems[index].value = value;
      return newItems;
    });
  };

  const handleSubmit = () => {
    console.log(selectItems);
    // Do something with the selectItems
  };

  return (
    <div>
      <h1>Drag and Drop Example</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={selectItems}
          strategy={verticalListSortingStrategy}
        >
          <div className="selectWrapper">
            {selectItems.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                options={dummyOptionData}
                selectValue={item.value}
                handleChange={handleChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="buttonWrapper">
        <button onClick={handleClick}>Add +</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
