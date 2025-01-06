import type { NodePlopAPI } from 'plop';

const parseComponentName = ({ componentName }: { componentName: string }) => {
  const parts = componentName.split('/');
  const pathPrefix = parts.map(() => '..').join('/');
  const displayName = parts.join('');
  const component = parts.pop();
  return {
    componentName,
    component,
    displayName,
    pathPrefix,
  };
};

const plopFunc = (plop: NodePlopAPI) => {
  plop.setGenerator('component', {
    description: 'Generate a new component with an accompanying stories file',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter the Path/Name of the component',
      },
    ],
    actions: function (d) {
      const data = parseComponentName(d as { componentName: string });
      return [
        {
          type: 'add',
          path: 'components/{{componentName}}.tsx',
          templateFile: 'plop-templates/components.hbs',
          data,
          skipIfExists: true,
        },
        {
          type: 'add',
          path: 'stories/{{componentName}}.stories.ts',
          templateFile: 'plop-templates/stories.hbs',
          data,
          skipIfExists: true,
        },
      ];
    },
  });
};

export default plopFunc;
