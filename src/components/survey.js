// import './Survey.css'
 
//  function Survey(){
//     const name="Studies";
//     return (<>
//     <h1>Survey component</h1>
//     <p>subject: {name}</p>
//     <p>4+5= {4+5}</p>
//     <button onClick={()=>console.log('OK!!')}>Click me</button>
//     </>
// )
// }
// export default Survey;

import './Survey.css';

function Survey() {
  const name = "Studies";
  return (
    <div className="survey-container">
      <h1>📊 Survey Component</h1>
      <p>📝 נושא: {name}</p>
      <p>🧮 4 + 5 = {4 + 5}</p>
      <button onClick={() => console.log('OK!!')}>לחצי כאן</button>
    </div>
  );
}
export default Survey;
