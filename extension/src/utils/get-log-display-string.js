const getLogDisplayString = (title, logs) => {
  const cleanTitle = title.replace("/aws/lambda/responsetek_ash1_", "");

  const info = logs.events.reduce((acc, log) => {
    return `${acc}<pre>${log.message}</pre><br/><hr/>`;
  }, "");

  return `
<html lang="en">
  <head>
    <title>${cleanTitle}</title>
    <style>
      pre {
        white-space: pre-wrap;
        font-size: 1.2rem;
      }
    </style>
  </head>
  <body>
    <h1>${cleanTitle} Logs:</h1>
    ${info}
  </body>
</html>
`;
};

export default getLogDisplayString;
