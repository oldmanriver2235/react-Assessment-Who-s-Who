import React from 'react'
import { Form, Radio, Header } from 'semantic-ui-react'

const RadioGroup = ({ title, options, check, change }) => {
  return (
    <Form>
      <Header as='h3'>{title}</Header>
      {options.map(option => (
        <Form.Field key={option}>
          <Radio
            label={option}
            value={option}
            checked={check === option}
            onChange={change}
          />
        </Form.Field>
      ))}
    </Form>
  )
}

export default RadioGroup
