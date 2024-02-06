interface DateGroupProperties {
  date: number;
  option: string;
}

function DateGroup(props: DateGroupProperties) {

  switch (props.option) {
    case 'daily':
      return <span> {props.date}</span>
    case 'weekly':
      return <span> {props.date}</span>
    case 'monthly':
      return <span>{ props.date }</span>
    default:
      return <span></span>
  }
}

export default DateGroup;
