{
  const createMarkup = (data) => {
    const ul = document.createElement('ul');
    for (const value of Object.values(data)) {
      const li = document.createElement('li');
      li.textContent = value;
      ul.appendChild(li);
    }

    document.body.appendChild(ul);
  };

  const main = async () => {
    const response = await fetch('http://localhost:3000/api');
    const json = await response.json();

    /* Create markup based on API response after a delay */
    setTimeout(() => {
      createMarkup(json);
    }, 2000);
  };

  main();
}