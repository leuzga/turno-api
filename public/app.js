const BASE = 'http://localhost:3500';

let current = { method: null, url: null, params: null, body: null };

function toggle(titleEl) {
  titleEl.classList.toggle('collapsed');
  const endpoints = titleEl.nextElementSibling;
  endpoints.classList.toggle('hidden');
}

function call(btn) {
  document.querySelectorAll('.endpoint').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  current.method = btn.dataset.method;
  current.url    = btn.dataset.url;
  current.params = btn.dataset.params || null;
  current.body   = btn.dataset.body ? JSON.parse(btn.dataset.body) : null;

  const label = document.getElementById('response-label');
  label.textContent = `${current.method} ${current.url}`;

  document.getElementById('status-badge').textContent = '';
  document.getElementById('status-badge').className = 'status-badge';
  document.getElementById('json-area').innerHTML = '';

  const formArea = document.getElementById('form-area');
  const paramsArea = document.getElementById('params-area');
  const bodyArea = document.getElementById('body-area');

  paramsArea.innerHTML = '';
  bodyArea.innerHTML = '';

  const needsForm = current.params || current.body;
  formArea.style.display = needsForm ? 'flex' : 'none';

  if (current.params) {
    current.params.split(',').forEach(p => {
      paramsArea.innerHTML += `
        <div class="field-group">
          <label>${p}</label>
          <input id="param-${p}" type="text" placeholder="${p}">
        </div>`;
    });
  }

  if (current.body) {
    Object.keys(current.body).forEach(key => {
      bodyArea.innerHTML += `
        <div class="field-group">
          <label>${key}</label>
          <input id="body-${key}" type="text" placeholder="${key}" value="${current.body[key]}">
        </div>`;
    });
  }

  if (!needsForm) send();
}

async function send() {
  let url = BASE + current.url;

  if (current.params) {
    current.params.split(',').forEach(p => {
      const val = document.getElementById(`param-${p}`)?.value || '';
      url = url.replace(`:${p}`, val);
    });
  }

  let body = null;
  if (current.body) {
    body = {};
    Object.keys(current.body).forEach(key => {
      body[key] = document.getElementById(`body-${key}`)?.value || '';
    });
  }

  const jsonArea = document.getElementById('json-area');
  jsonArea.innerHTML = '<span class="spinner"></span>';

  try {
    const res = await fetch(url, {
      method: current.method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    const badge = document.getElementById('status-badge');
    badge.textContent = res.status;
    badge.className = 'status-badge ' + (res.ok ? 'ok' : res.status >= 500 ? 'error' : 'warn');

    jsonArea.innerHTML = `<pre class="fade-in">${highlight(JSON.stringify(data, null, 2))}</pre>`;
  } catch (err) {
    jsonArea.innerHTML = `<span class="json-null fade-in">Error: ${err.message}</span>`;
  }
}

function highlight(json) {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*([eE][+-]?\d+)?)/g, match => {
      if (/^"/.test(match)) {
        return /:$/.test(match)
          ? `<span class="json-key">${match}</span>`
          : `<span class="json-string">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span class="json-bool">${match}</span>`;
      if (/null/.test(match))       return `<span class="json-null">${match}</span>`;
      return `<span class="json-number">${match}</span>`;
    });
}
