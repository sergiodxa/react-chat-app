import format from "date-fns/format";

function groupBy(messages) {
  return messages.reduce((groups, message) => {
    const date = new Date(message.date);
    const group = format(date, "dddd, MMMM Do");
    return {
      ...groups,
      [group]: groups[group] ? groups[group].concat(message) : [message]
    };
  }, {});
}

export default groupBy;
