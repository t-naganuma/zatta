import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  options: { value: string; label: string }[];
  selectValue: string;
  handleChange: (name: string, value: string) => void;
};

export const SortableItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className="sortable" style={style}>
      <div className="sortable-item">
        <i
          ref={setActivatorNodeRef}
          className="dragIcon"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          {...attributes}
          {...listeners}
        />
        <select
          name="example"
          id="example"
          className="select"
          value={props.selectValue}
          onChange={(e) => props.handleChange(props.id, e.target.value)}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
