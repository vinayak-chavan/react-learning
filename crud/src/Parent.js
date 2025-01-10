import Child from './Child';

function Parent() {
  let name = "Vinayak";

  const getData = (data) => {
    console.log(data);
  }
  
  return (
    <div className='App'>
      <Child
        func={getData} dataParentToChild={name}
      />
    </div>
  );
}

export default Parent;