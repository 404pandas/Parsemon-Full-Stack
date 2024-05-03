const dataExtensionFormHandler = async function (event) {
  event.preventDefault();

  const dataId = document.querySelector('input[name="data-id"]').value;
  const body = document.querySelector(
    'textarea[name="dataExtension-body"]'
  ).value;

  if (body) {
    const response = await fetch('/api/dataExtension', {
      method: 'POST',
      body: JSON.stringify({
        dataId,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace('/login');
    }
  }
};

document
  .querySelector('#new-dataExtension-form')
  .addEventListener('submit', dataExtensionFormHandler);
