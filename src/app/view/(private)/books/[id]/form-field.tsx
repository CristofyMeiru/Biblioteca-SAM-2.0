import { EditBookDTO } from '@/app/api/books/[id]/book.dto';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { capitalCase } from 'change-case';
import { Control } from 'react-hook-form';

export function BookFormField({
  label,
  name,
  value,
  inEdit,
  control,
}: {
  label: string;
  name: keyof EditBookDTO;
  value: string | null;
  inEdit: boolean;
  control: Control<EditBookDTO>;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <span className="text-sm text-muted-foreground">{label}</span>
      {inEdit ? (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...(field as any)} />
              </FormControl>
            </FormItem>
          )}
        />
      ) : (
        <span className="font-medium">{value ? capitalCase(value) : 'Não informado'}</span>
      )}
    </div>
  );
}
