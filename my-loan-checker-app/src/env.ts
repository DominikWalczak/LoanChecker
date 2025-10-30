/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import z from 'zod';

const env = z.object({
  IP: z.string(),
});
console.log(process.env);
const _clientEnv = {
  IP: process.env.EXPO_PUBLIC_IP,
};

const parsed = env.safeParse(_clientEnv);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env file, Make sure all required variables are defined in the .env file.`,
  );
  throw new Error('Invalid environment variables, Check terminal for more details ');
}

export default parsed.data;