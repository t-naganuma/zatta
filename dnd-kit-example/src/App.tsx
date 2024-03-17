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
  const [items, setItems] = useState(["1", "2", "3", "4"]);

  const handleClick = () => {
    setItems((prevItems) => {
      return [...prevItems, (prevItems.length + 1).toString()];
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    console.log({ active, over });
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <h1>Drag and Drop Example</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="selectWrapper">
            {items.map((id) => (
              <SortableItem key={id} id={id} options={dummyOptionData} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={handleClick}>Add +</button>
    </div>
  );
}

export default App;
