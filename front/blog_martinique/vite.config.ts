import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ( mode: any ) => {
  
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    plugins: [react()],
    define: {
    'process.env': {}
    },
    envPrefix: ['VITE_', 'NEXT_', 'REACT_'],

  
  })
  
};

