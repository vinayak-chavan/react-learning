const Child = (props) => {
  
  props.func(`My name is ${props.dataParentToChild}`);
  return (
    <>
      <h1>I am the Child Component!</h1>
      <h1>My name is {props.dataParentToChild}</h1>
    </>
  );
}

export default Child;