import fs from 'node:fs';
import { parseDocument } from 'yaml';

const source = fs.readFileSync('src/data/TSP.yaml', 'utf8');
const document = parseDocument(source, { uniqueKeys: true });
if (document.errors.length) throw new Error('TSP.yaml is invalid YAML: ' + document.errors.map(e => e.message).join('; '));
const data = document.toJS();
const fail = message => { throw new Error('TSP.yaml validation: ' + message); };
const has = (object, key) => object && typeof object[key] === 'string' && object[key].trim();
if (!has(data.identity,'name') || !has(data.identity,'monogram') || !has(data.identity,'headline') || !has(data.identity,'introduction')) fail('identity fields missing');
if (data.identity.name !== 'Tanner S. Phillips') fail('unexpected public name');
for(const key of ['approach','interests','philosophy','journey']){
  if(!Array.isArray(data[key]) || data[key].length === 0) fail(key + ' must be a populated sequence');
}
if (data.approach.join('|') !== 'Thinker|Learner|Explorer|Creator') fail('approach must match approved order');
const allowed = ['about','projects','knowledge','publications','education','contact'];
if (!data.explore || Object.keys(data.explore).length !== allowed.length || allowed.some(key => data.explore[key] !== key+'/')) fail('invalid section routes');
if (Object.keys(data.connect || {}).sort().join(',') !== 'github,linkedin') fail('Only approved contact channels may be exported');
if (data.connect.linkedin !== 'https://www.linkedin.com/in/securityeducator/' || data.connect.github !== 'https://github.com/TannerPhillips-SecurityEducation') fail('Contact URLs must match approved profiles');
const prohibited = /\b(?:Greenville|Taylors|Charlotte|South Carolina|daughter|divorce|street address|telephone|date of birth)\b/i;
if (prohibited.test(source) || /\b(?:mailto:|tel:)\b/i.test(source)) fail('private detail detected');
console.log('TSP.yaml parsed successfully and approved public schema validated.');
