import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.szakify',
  appName: 'Szakify',
  webDir: 'dist',
  plugins: {
    EdgeToEdge: {
      backgroundColor: '#ffffff',
    },
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: {
        statusBarColor: '#00000000',
        statusBarContent: 'dark',
        navigationBarColor: '#00000000',
        navigationBarContent: 'dark',
      },
    },
  },
};

export default config;
