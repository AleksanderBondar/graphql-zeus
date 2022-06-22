import chalk from 'chalk';
import fetch from 'node-fetch';
import {
  Gql,
  SpecialSkills,
  Thunder,
  Zeus,
  InputType,
  Selector,
  GraphQLTypes,
  useZeusVariables,
  ZeusScalars,
} from './zeus';
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { typedGql } from './zeus/typedDocumentNode';

export const testMutate = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });
  const td = typedGql('mutation')({
    addCard: [{ card: { Attack: 1, Defense: 2, name: 'Pokemon', description: 'Stronk' } }, { id: true }],
  });
  client
    .mutate({
      mutation: td,
    })
    .then((data) => data.data?.addCard?.id);
};

const sel = Selector('Query')({
  drawCard: {
    Children: true,
    Attack: true,
    info: true,
    attack: [{ cardID: ['sss'] }, { Attack: true }],
  },
  cardById: [{ cardId: '' }, { Attack: true }],
});

const decoders = ZeusScalars({
  JSON: {
    encode: (e: unknown) => JSON.stringify(e),
    decode: (e: unknown) => {
      console.log(e);
      return e as { power: number };
    },
  },
});

export type IRT = InputType<GraphQLTypes['Query'], typeof sel, typeof decoders>;

const printQueryResult = (name: string, result: any) =>
  console.log(`${chalk.greenBright(name)} result:\n${chalk.cyan(JSON.stringify(result, null, 4))}\n\n`);
const printGQLString = (name: string, result: string) =>
  console.log(`${chalk.blue(name)} query:\n${chalk.magenta(result)}\n\n`);
const run = async () => {
  const { addCard: ZeusCard } = await Gql('mutation')(
    {
      addCard: [
        {
          card: {
            Attack: 1,
            Defense: 1,
            description: 'lorem """ \' ipsum \n lorem ipsum',
            name: 'SADSD',
            skills: [SpecialSkills.FIRE],
          },
        },
        {
          cardImage: {
            bucket: true,
            region: true,
            key: true,
          },
        },
      ],
    },
    { operationName: 'ZausCard' },
  );
  printQueryResult('ZeusCard', ZeusCard);

  const blalba = await Gql('query')({
    drawChangeCard: {
      __typename: true,
      '...on EffectCard': {
        effectSize: true,
        name: true,
      },
      '...on SpecialCard': {
        name: true,
      },
    },
  });
  printQueryResult('drawChangeCard', blalba.drawChangeCard);
  const blalbaScalars = await Gql('query', { scalars: decoders })({
    drawCard: {
      info: true,
    },
  });
  if (typeof blalbaScalars.drawCard.info.power !== 'number') {
    throw new Error('Invalid scalar decoder');
  }
  printQueryResult('blalbaScalars', blalbaScalars.drawCard.info.power);

  // Thunder example
  const thunder = Thunder(async (query) => {
    const response = await fetch('https://faker.graphqleditor.com/a-team/olympus/graphql', {
      body: JSON.stringify({ query }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return new Promise((resolve, reject) => {
        response
          .text()
          .then((text) => {
            try {
              reject(JSON.parse(text));
            } catch (err) {
              reject(text);
            }
          })
          .catch(reject);
      });
    }
    const json = await response.json();
    return json.data;
  });
  const blalbaThunder = await thunder('query', {
    scalars: decoders,
  })({
    drawCard: {
      Attack: true,
      info: true,
    },
    drawChangeCard: {
      __typename: true,
      '...on EffectCard': {
        effectSize: true,
        name: true,
      },
      '...on SpecialCard': {
        name: true,
      },
    },
  });
  printQueryResult('drawChangeCard thunder', blalbaThunder.drawChangeCard);

  const {
    listCards: stack,
    drawCard: newCard,
    drawChangeCard,
  } = await Gql('query')({
    listCards: {
      name: true,
      cardImage: {
        bucket: true,
      },
    },
    drawCard: {
      Attack: true,
      name: `@skip(if:true)`,
    },
    drawChangeCard: {
      '...on SpecialCard': {
        name: true,
      },
      '...on EffectCard': {
        effectSize: true,
      },
    },
  });

  printQueryResult('stack', stack);
  printQueryResult('newCard', newCard);
  printQueryResult('changeCard', drawChangeCard);

  const aliasedQuery = Zeus('query', {
    __alias: {
      myCards: {
        listCards: {
          name: true,
        },
      },
    },
    listCards: {
      __alias: {
        atak: {
          attack: [
            { cardID: ['aaa'] },
            {
              name: true,
              description: true,
              __alias: {
                bbb: {
                  Defense: true,
                },
              },
            },
          ],
        },
      },
    },
  });
  printGQLString('aliasedQuery', aliasedQuery);
  const operationName = Zeus(
    'query',
    {
      listCards: {
        Attack: true,
      },
    },
    {
      operationOptions: {
        operationName: 'ListCards',
      },
    },
  );
  printGQLString('operationName ListCards', operationName);
  const { $, values, $params } = useZeusVariables({ cardIds: '[String!]!' })({ cardIds: ['1', '2'] });
  const aliasedQueryExecute = await Gql('query')(
    {
      listCards: {
        __alias: {
          namy: {
            name: true,
          },
          atak: {
            attack: [
              { cardID: $('cardIds') },
              {
                name: true,
                __alias: {
                  bbb: {
                    Defense: true,
                  },
                  ccc: {
                    Children: true,
                  },
                },
              },
            ],
          },
        },
        id: true,
      },
    },
    {
      variables: {
        $params,
        values,
      },
    },
  );
  printQueryResult('aliasedQuery', aliasedQueryExecute);
  const Children = undefined;
  const emptyTestMutation = Zeus('mutation', {
    addCard: [
      {
        card: {
          Attack: 1,
          Defense: 2,
          description: 'lorem ipsum \n lorem ipsum',
          name: 'SADSD',
          Children,
          skills: [SpecialSkills.FIRE],
        },
      },
      {
        id: true,
        description: true,
        name: true,
        Attack: true,
        // // skills: true,
        Children,
        Defense: true,
        cardImage: {
          bucket: true,
          region: true,
          key: true,
        },
      },
    ],
  });
  printQueryResult('emptyTestMutation', emptyTestMutation);

  const interfaceTest = await Gql('query')({
    nameables: {
      __typename: true,
      name: true,
      '...on Card': {
        Attack: true,
      },
      '...on SpecialCard': {
        effect: true,
      },
      '...on CardStack': {
        cards: {
          name: true,
        },
      },
    },
  });

  printQueryResult('interfaceTest', interfaceTest);
  // Variable test
  const mutationVars = useZeusVariables({ Attack: 'Int!', Defense: 'Int!' })({
    Attack: 1,
    Defense: 10,
  });

  const test = await Gql('mutation')(
    {
      addCard: [
        {
          card: {
            Attack: mutationVars.$('Attack'),
            Defense: mutationVars.$('Defense'),
            name: 'aa',
            description: 'aa',
          },
        },
        {
          id: true,
          description: true,
          name: true,
          Attack: true,
          // skills: true,
          Children: true,
          Defense: true,
          cardImage: {
            bucket: true,
            region: true,
            key: true,
          },
        },
      ],
    },
    {
      variables: mutationVars,
    },
  );
  printQueryResult('variable Test', test);

  const zeusTDDVars = useZeusVariables({ cardId: 'String!' })({
    cardId: 'blabla',
  });

  const selectorTDD = Selector('Query')({
    drawCard: {
      id: true,
      Attack: true,
      Defense: true,
    },
    cardById: [{ cardId: zeusTDDVars.$('cardId') }, { id: true }],
  });

  const generatedTypedDocumentNode = typedGql('query')(selectorTDD, { variables: zeusTDDVars });
  printQueryResult('Generated TypedDocumentNode Test', generatedTypedDocumentNode);
};
run();
