import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import CodeMirror from 'codemirror';
import util from 'util';
import { Buffer } from 'buffer';
import 'codemirror/mode/javascript/javascript.js';
import zlib from 'zlib';

// Disabled: No dynamic import() support in jshint!?
// import jshint from 'jshint';
// import 'codemirror/addon/lint/lint.js';
// import 'codemirror/addon/lint/javascript-lint.js';
// window.JSHINT = jshint.JSHINT;

const examples = {
  Babel: '#H4sIAAAAAAAAA4VSwWojMQy9+yvUsDDd0IyPhXQSAkthD7sQaG9LIc7Y6bh4LGNr0oaQf1/ZTg89FeYgPek9yU8j52IObymM8KS83uOHyMDzYBOkCoD5MP1EJsHjE4yoJ8fhu6UB3qZEQIOBAzqH79a/wu/nv3+WLMBfd6Oxp1MwMNDo1hlJfbSBKQyuZlVqlgsAbdtSnmm0JYzQozYMZY6spMLfoz7V/k7bI1i9mvXoSVlv4mzdSQav5V75o0q1o4S5XKOiJD+lymMVNQmUc2AJNJp0I+ZSCDsGjAR7tTcODhFHaAaikJZSanNss2mtRbkpDbLHaDb3zcMX2tZNr9ZvIwZMyv1yKqWcmEiWTfxWMxT6Ilz5iz4LlLQqlHmCLeA7nItpcIFVHd1SVD4dMI63OwFQqLCFM8fX7LrJiRnNUbnJNFy7iN1daaqz0xL+ff+SF3H5yYvwvafReGqzua31fJX8P7D+rgvRrH+c84qXTuZk9yD+Axt71gR8AgAA',
  Babylon: '#H4sIAAAAAAAAA4VTbW/TMBD+nl9x65ekVXBWJoa0tRV0KmxSB4hOSPDNjW+Nq8SO7Eu78uvxS7uOAkKyFOt5uzvbKQbJANa2bWDBlVjqp8QDD5W0YCMA+IRlR2hhtoBGi652262kCtadJaAK4VHXtd5KtYLbh/v5lQtwa3QmdEm7FqGipp54xJZGts7iwHEvRvU8AcAYI18ThSRtoNQCHeQ9RTQF/1KLXdSPhNyAFONeqRVxqdD0JqPCgXu65GrDbVSErafjLiQVh6gwLKfUAq9rkARCoz1LBkWSyKbVhmD6fvp9/vkTPBrdQFoRtfaqKARumD82JnWx5MtdrdXavrtIr5PEteTOZd/B2AWWXYOK2AppVqPfTnd3IkujIu1f7x2oVm4Q51C4PVRlswBmUZsDmQ77zzVsiX8YFh7LYlb/RTcNGv5FW0lSqxPLNyzdoV9k5zm8yeHV8Py5pWg7kX8wiDeB8DP47zDNTyrksTcfFHBmkR64cUeQnVRlP9DorH9UciJeVjfuXo2u/zF4LVcV/X+aYQ7HWYLnRHuLjbRthUaWc09naVD5eX4rcRwnwEwqQuWoncs7Z2+PF+Kz/I0cCtyjrdiNQU64CFyWRo0vMbzM4fUxOhKs3ddkPnx46H5ldKfE35M/Bi5Lo8YnX4b1IjuJD4KZTn1FJdDMtW6zrA/jSdQwE+BwEe5PFnrLuBCzjXutc2ndtI5LDVr5E11+NB4yA+p8vwCEMEvkTAQAAA==',
  'lit-html': '#H4sIAAAAAAAAA0VRy27CMBC8+yuWqBIP0fhOk5xaiUN7KXwAJl4aI78Ub3gI8e+1nUIlH1Yzu7OzY75gCzgGb2AjrNy7C0vAtlMBwggAXrAdCAN8bMA4OehYnhV1cBwCAXUIB6e1Oyv7A+vt1+cqCsRXTaRr6eoROjK6SUhoe+XjSATrYpQqEgFQliWlnSgVuR5aJzFCaYaPQ3l+7+R17K+kOoGSddE6S0JZ7Ium4hH8o1thTyKMHblM9FhlJf6QyscKmgYQWoMikA7DhC04Y8p41xPckv0l9Ggl9nc49M7AtCPyYcW5xFOZ0iuV41rRa+qdvjHGObzjIfoCAYTGa0ExpsG2pJxl0XRMzly3D6aGmRUG51A3Oa1d5Zs1xlDh5ZaIe8V9sxt1v7ORnPtTOX9HcAZBChJs9Dr7XzCbPs3Nl/HEdjBoqUwhzN/YL+rqQAwEAgAA',
  'Material UI': '#H4sIAAAAAAAAA5VTTW/aQBC9+1dMuBgQ2GkPPRBAaT6kViptFLhVPSzeAU+y9lreMQFV/e+d9ZJaiUqrSJa8fjPvzZuZdTqMhvDgqgKWqtRru488sMrJgQsA4B6zhtHB7RIKqxsjxyfiHB4ax8A5wsYaY5+o3MKn1eLLRATkmZ5pm/GhQsi5MHOPuKymSigCznpBqucDAEmSsK+JmtjWkFmNAnlOGkgtf231IeRPNe2A9KyX2ZIVlVj35tNUwGM4U+VOuZDRHn04nFql9FmqbVZx7EAZA8SgLbqzaJhGERWVrRnuUWUMm9oWEOfMlZukqcZd4oeWkE1rH7989yG+eMG4+bb4H2msbfGCuGholWOBd7Xdkcb6HwKFYqxJmXFDl+fJ+/PU8UEWk76W6MQ/VtWVepNkYHQKN5JwR9nj24x1LFGKZF+u9QIz6A9gNofvEYSJJZlMhfHWiP2S+6F6onGjGsMj+Cl5AI94mEDMxAbX4m3Ugu2nwCv/PmIkla6Ncu6rKvCetjlLQtGQXEo39sFxqXa0VUxyxH0ll31c2BpjYf8ajE6Y6pr5uzEt8So0G2zkVPIK9774tZEAsIUlGpQrpdqBhnrRD5nN871Jaixldf0THl6vuHNSNsaEsicGGlIGktJ2KLNofCjZIh+zrg6fdT/+81fFg2hw8Rt+yVTnJAQAAA==',
  Tensorflow: '#H4sIAAAAAAAAA21TTU/cMBC951cMe0kWRQ5LQZUCu+KC2kOrVlp6Qhy88YR4ldjGnsBuEf+dcbyoi1Qpiuz5eDPvzbg6zU5hG9wAa2nUxu6yaLjrdICQDIA7bEbCALdrGKwaez6+aOpgOwYC6hBa2/f2RZtH+H7380fNAPxdnyjb0N4hdDT0q2gJjdeOU9i4nCWoWXQACCEo1kSlyXporEI2xZwqJU35G6v2Kf5a6WfQajlrrCGpDfrZ6rpi48HdSPMsQ4qYjtGdThNS9QE1kZWUB5B9D5pAWQwn2WmVZXpw1nO3LbTeDpB3RC7UVaXwWUTFhLbVDaEJ1rdMv6J2G27OxOJMnOVXWcadsTzMEntYMooI+DSiIS37Yn6VTQ4hlSrY1cs9+iAUg2HxOhpNoYZFCdq4kdaddFjD/eLhbc6JWVXBb49OepzETxVaVo08K8FTqGHtsNHtfvL3NjA5o6aLdaQH/Re9ODTQ2MHpnovGsBryAaVZP40Mrm69tz4v/+WwOzyq/O3QxDdk2SUhBDvwb2+4AOkGlCT5qR9x0GIXkhBJs3NV3DPF8xK+lHDxUML9RQmLBwZP0fv/RXPoZQlfj6NjK3ex0pEaY4jLGO+xmQ+uraZiF0pGnvO2oSmKOSxX8JoBMMafcKwnWd4E1r9Fj6Zh4QzIxMxZbegospPB5AQB0cAGmTfWCfCXw9TTxtuXgB54ccjaPkRwDk8DGYlHzAn8WMaB10PEzRTasLbxMbEGqXnHE9ENFZ8UuYxCLCYhmJJdk2fecbt4Ru+VNixC2gMAAA==',
  VueJS: '#H4sIAAAAAAAAAz1QO2/CMBDe/SuOdEiLqngPIVslhnYCdcbEV2Lk2FZ8CSCU/95zUipZ1ul73UOuxRouMXSwV06f/E0k4NCaCHEBAG/YDIQRPvbQeT1YLq+GWrgMkYBahB9vrb8ad4bd4euz5AB+1Ur7hu4BoaXO1gmJTW8CWxjcZktUlgiAoigo9URtyPfQeI0MJY9cTLP/5PV90VfajGD0Nmu8I2Uc9lldSQb/6Ea5UcVFMZeJXqo5ST6j5mUV5RGUtWAItMe4EmsphOmC7wm+B16w9x3kLVGIpZQaxyKdrDBejgNy20ipyDdC/M9TGMd/ugds4ViF+vGADmNUZ4RpqmSojyx3eE0NXh8CAG0J+ct/QP7OmFakSkgsPN0s2iHfO/l4jFXO5CSmt80vjswGI8sBAAA='
};

const defaultContents = `/*
* jspm Sandbox
*
* This sandbox executes ES modules with just the following HTML:
* 
* <!doctype html>
* <script type="module">
*   ...this editor code...
* </script>
* <body>
*   <div id="container"></div>
*   <canvas id="canvas"></canvas>
* </body>
* 
* That's all it does!
*/
`;

const sandboxTpl = () => html`
<style>
  @media screen and (max-width: 750px), screen and (max-device-width: 750px) {
    .editor {
      display: none;
    }
  }
  .CodeMirror {
    background: transparent;
    height: 100%;
  }
  .editor-bar {
    width: 0;
    height: 3em;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 12;
  }
  .editor-bar .inner {
    width: 10em;
    margin-left: -5em;
    margin-top: 1.2em;
  }
  .editor-bar select {
    float: left;
    width: 8em;
  }
  .editor-bar button {
    float: right;
    width: 3em;
    margin-top: 0.05em;
    z-index: 13;
    cursor: pointer;
    color: #666;
    text-shadow: 1px 1px #efefef;
    background: transparent;
    border: none;
    outline: none;
  }
  .editor-bar button:hover {
    color: #222;
    text-shadow-color: #fff;
  }
  .editor-bar button[disabled] {
    cursor: wait;
    color: #aaa;
  }
  .output .log .item {
    border-bottom: 1px solid #777;
    padding-bottom: 0.5em;
    padding: 0.5em 2em;
    margin: 0;
    white-space: pre-wrap;
  }
</style>
<div class="editor-bar">
  <div class="inner">
    <select class="examples">
      <option value="">Examples</option>
      ${unsafeHTML(Object.entries(examples).map(([name, url]) => `<option value="${url}">${name}</option>`).join(''))}
    </select>
    <button class="run">&#9654;&nbsp;Run</button>
  </div>
</div>
<div class="editor" style="position: absolute; top: 3.5em; left: 0; width: 50%; height: calc(100% - 3.5em);">
  <div style="width: 100%; height: 100%;">
    <div class="codemirror" style="height: 100%;"></div>
  </div>
</div>
<div class="output" style="position: absolute; top: 3.5em; right: 0; width: 50%; height: calc(100% - 3.5em); border-left: 1px solid #eee;">
  <div style="position: absolute; width: 100%; height: 100%; z-index: 11;">
    <div class="browser-wrapper" style="width:100%; height: 70%; background-color:#fff"></div>
    <div class="log" style="font-size: 1em; background-color: #444; color: #eee; overflow-y: scroll; height: 30%;"></div>
  </div>
</div>
`;

let editor, sandbox, curHash, curJs;
function initSandbox (contents) {
  if (!contents) {
    const hash = location.hash.slice(1);
    if (hash) {
      curHash = hash;
      try {
        contents = zlib.gunzipSync(new Buffer(hash, 'base64')).toString('utf8');
      }
      catch (e) {
        console.error(e);
        contents = defaultContents;
      }
    }
    else {
      contents = defaultContents;
    }
  }
  sandbox = document.createElement('div');
  sandbox.className = 'sandbox';
  render(sandboxTpl(), sandbox);
  
  const container = document.body.querySelector('.container');
  container.appendChild(sandbox);

  editor = CodeMirror(sandbox.querySelector('.codemirror'), {
    lineNumbers: true,
    value: contents,
    mode: "javascript",
    // gutters: ["CodeMirror-lint-markers"],
    // lint: {
    //  esversion: '8'
    // }
    scrollbarStyle: 'null',
    tabSize: 2,
  });

  const browserWrapper = sandbox.querySelector('.browser-wrapper');
  const logWrapper = sandbox.querySelector('.log');

  window.addEventListener('popstate', function () {
    const hash = location.hash.slice(1);
    if (hash && hash !== curHash) {
      editor.setValue(curJs = zlib.gunzipSync(new Buffer(hash, 'base64')).toString('utf8'));
      curHash = hash;
      select.value = '';
    }
  });

  function run () {
    let loading = true;
    button.disabled = true;

    const script = document.createElement('script');
    script.type = 'module';
    const js = editor.getValue();

    if (curJs !== js) {
      curHash = '#' + zlib.gzipSync(new Buffer(js)).toString('base64');
      if (location.hash !== curHash) {
        window.history.pushState(null, document.title, curHash);
        select.value = '';
      }
    }
    curJs = js;

    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      margin: '0',
      padding: '0',
      borderStyle: 'none',
      height: '100%',
      width: '100%',
      marginBottom: '-5px', // no idea, but it works
      overflow: 'scroll'
    });
    const blobUrl = URL.createObjectURL(new Blob([
`<!doctype html><style>body{cursor:wait}</style><script type="module">window.parent.jspmSandboxStarted();${js.replace(/<\/script>/g, '&lt;\/script>')/*UNSAFE!!*/}
</script>
<script type="module">
window.parent.jspmSandboxFinished();
</script>
<script>
window.onerror = function (msg, source, line, col, err) {
  window.parent.jspmSandboxError(msg, source, line, col, err);
};
window.console = window.parent.jspmConsole;
</script>
<body style="margin: 0; padding: 0; height: 100%; background-color: #fff">
  <canvas id="canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" touch-action="none"></canvas>
  <div id="container"></div>
</body>
`], { type: 'text/html' }));
    iframe.src = blobUrl;
    browserWrapper.innerHTML = '';
    browserWrapper.appendChild(iframe);

    let started = false;
    window.jspmSandboxStarted = function () {
      started = true;
    };
    window.jspmSandboxFinished = function () {
      if (!started) {
        if (loading) {
          jspmLog('Network error loading modules. Check the browser network panel.');
        }
      }
      else {
        loading = false;
        button.disabled = false;
        iframe.contentDocument.body.style.cursor = 'default';
      }
    };
    window.jspmSandboxError = function (msg, source, line, col, err) {
      if (loading) {
        loading = false;
        button.disabled = false;
        iframe.contentDocument.body.style.cursor = 'default';
      }
      let parts = err.stack.split(blobUrl);
      if (parts.length === 1) {
        if (line === 1) col = col - 72;
        parts = [`${msg} sandbox:${line}:${col}`];
      }
      jspmLog(parts.join('sandbox'), { color: 'red' });
    };
    // TODO: support the rest of the console API
    window.jspmConsole = Object.assign(Object.create(null), logWrapper, {
      log (arg) {
        let content = '';
        for (let i = 0; i < arguments.length; i++) {
          content += util.inspect(arguments[i], { depth: 0 }) + (i < arguments.length - 1 ? ' ' : '');
        }
        jspmLog(content.replace(/\\n/g, '\n'));
        window.console.log.apply(logWrapper, arguments);
      },
      error (err) {
        let parts = (err && err.stack || err.toString()).split(blobUrl);
        jspmLog(parts.join('sandbox'), { color: 'red' });
      }
    });
    function jspmLog (content, style) {
      const newItem = document.createElement('pre');
      if (style)
        Object.assign(newItem.style, style);
      newItem.className = 'item';
      newItem.innerHTML = content;
      logWrapper.appendChild(newItem);
      logWrapper.scrollTop = logWrapper.scrollHeight;
    }
  }

  const button = sandbox.querySelector('button.run');
  button.addEventListener('click', run);
  window.jspmLog = function (content) {
    logWrapper.innerHTML += '<pre class="item">' + content.replace(/</g, '&lt;') + '</pre>';
  };

  const select = document.body.querySelector('select.examples');
  select.addEventListener('change', () => {
    if (select.value && location.hash !== select.value) {
      editor.setValue(curJs = zlib.gunzipSync(new Buffer(curHash = select.value.slice(1), 'base64')).toString('utf8'));
      location.hash = select.value;
    }
  });

  if (curHash)
    run();
}

initSandbox();
