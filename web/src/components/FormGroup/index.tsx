import { AnyComponent, FunctionComponent } from "preact";
import {
  ConfigurationField,
  ConfigurationFieldType,
} from "../../api/euphonium/plugins/models";
import IconCard from "../ui/IconCard";
import CheckboxField from "./fields/CheckboxField";
import { FieldProps } from "./fields/FieldProps";
import LinkButton from "./fields/LinkButton";
import ModalConfirm from "./fields/ModalConfirm";
import NumberField from "./fields/NumberField";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";

export interface FormGroupProps {
  fields: ConfigurationField[];
  value: any;
  onChange: (value: any) => void;
  label?: string;
  onChangeFinished?: () => void;
}

export const FIELD_COMPONENTS: {
  [key in any]: FunctionComponent<FieldProps<any>>;
} = {
  [ConfigurationFieldType.TEXT]: TextField,
  [ConfigurationFieldType.NUMBER]: NumberField,
  [ConfigurationFieldType.CHECKBOX]: CheckboxField,
  [ConfigurationFieldType.SELECT]: SelectField,
  [ConfigurationFieldType.LINK_BUTTON]: LinkButton,
  [ConfigurationFieldType.MODAL_CONFIRM]: ModalConfirm
};

export default function FormGroup({
  fields,
  value,
  onChange,
  label,
  onChangeFinished
}: FormGroupProps) {
  return (
    <IconCard iconName="settings" label={label}>
      <div class="flex flex-col space-y-5">
        {fields.map((field) => {
          const FieldComponent: AnyComponent<FieldProps<any>> =
            FIELD_COMPONENTS[field.type];
          if (!FieldComponent) {
            return <p>Unsupported field type: {field.type}</p>;
          }
          return (
            <FieldComponent
              key={field.key}
              field={field}
              value={value[field.key]}
              onChange={(fieldValue: any) =>
                onChange({ ...value, [field.key]: fieldValue })
              }
              onChangeFinished={onChangeFinished}
            />
          );
        })}
      </div>
    </IconCard>
  );
}
