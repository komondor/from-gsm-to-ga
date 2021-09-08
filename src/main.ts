/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// File modified by Francois Seguin on 2021-09-08


import * as core from '@actions/core';
import { Client } from './client';
import { Reference } from './reference';

function parseSecretsRefs(secretsInput: string): Reference[] {
  const secrets = new Array<Reference>();
  for (const line of secretsInput.split(`\n`)) {
    for (const piece of line.split(',')) {
      secrets.push(new Reference(piece.trim()));
    }
  }
  return secrets;
}

async function run(): Promise<void> {
  try {
    const secretsInput = core.getInput('secrets', { required: true });

    const credentials = core.getInput('credentials');

    const client = new Client({
      credentials: credentials,
    });

    const secretsRefs = parseSecretsRefs(secretsInput);

    for (const ref of secretsRefs) {
      const value = await client.accessSecret(ref.selfLink());

      value.split(/\r\n|\r|\n/g).forEach((line: String) => {
        var [name, secret] = line.split('=');
        core.setSecret(secret);
        core.setOutput(name, secret);
      });
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
