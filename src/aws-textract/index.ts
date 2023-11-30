import 'dotenv/config';

import { AnalyzeDocumentCommand, AnalyzeDocumentCommandInput } from '@aws-sdk/client-textract';
import fs from 'fs';
import { textractClient } from './config';
import { AwsTextractResponse } from './types';

async function analyzeDocumentText(params: AnalyzeDocumentCommandInput) {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc) as AwsTextractResponse;

    const blocks = response.Blocks;

    if (!blocks) {
      console.log('Não há blocos para ser lido')
      return;
    }

    let texts: string[] = [];

    for (const block of blocks) {
      const text = block.Text;

      if (!text) {
        continue;
      }

      texts.push(text);
    }

    console.log('Arquivo lido. Textos coletados')
    fs.writeFile('./result.json', JSON.stringify(texts), () => {
      console.log('Arquivo salvo em result.json');
    });

  } catch (err) {
    console.log("Error", err);
  }
}

const params: AnalyzeDocumentCommandInput = {
  Document: {
    S3Object: {
      Bucket: 'test-aws-extract',
      Name: 'cores.png' // test.png // cores.png // conta-de-luz-neoenergia-coelba.png // curriculo-tiago-goncalves.pdf
    },
  },
  FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
}

analyzeDocumentText(params);