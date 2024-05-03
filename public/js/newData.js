const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="data-title"]').value;
  const body = document.querySelector('textarea[name="data-body"]').value;

  await fetch(`/api/data`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-data-form')
  .addEventListener('submit', newFormHandler);
