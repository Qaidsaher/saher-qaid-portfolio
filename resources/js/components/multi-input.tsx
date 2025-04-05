import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MultiInputProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export function MultiInput({ label, values, onChange, placeholder }: MultiInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const addItem = () => {
    if (inputValue.trim() === "") return;
    onChange([...values, inputValue.trim()]);
    setInputValue("");
  };

  const removeItem = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  // Add new item when Enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem();
    }
  };

  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1 border px-2 py-0.5 rounded-md bg-blue-100 text-blue-800"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 focus:outline-none"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button type="button" onClick={addItem}>
          Add
        </Button>
      </div>
    </div>
  );
}
