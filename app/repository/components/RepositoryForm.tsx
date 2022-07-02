import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { LabeledDropDown } from 'app/core/components/LabeledDropDown';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function RepositoryForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
    return (
        <Form<S> {...props}>
            <LabeledDropDown name="type" label="Type" placeholder="Type" options={['GitHub']} />
            <LabeledTextField name="url" label="URL" placeholder="URL" />
        </Form>
    );
}
