function MyDetails() {
  const firstName = 'Hadassa';
  const lastName = 'gabay';
  const yearOfBirth = 2005;
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearOfBirth;

  const sayName = () => {
    console.log(`${firstName} ${lastName}`);
  };

  return (
    <div>
      <h2>{firstName} {lastName}</h2>
      <p>Age: {age}</p>
      <button onClick={sayName}>Click Me</button>
    </div>
  );
}

export default MyDetails;
