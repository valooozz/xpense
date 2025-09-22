import { Option } from "./option";

export interface FormField {
  name: string;
  type: string;
  label: string;
  options?: Option[];
  validators?: string[];
}