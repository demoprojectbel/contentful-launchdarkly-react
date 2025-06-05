import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

const init = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '6838671602a68a090f0fec81', //production
    //clientSideID: '6838671602a68a090f0fec80', //test

    /*
     //Flash Sale Target individual on for Mary
     context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-133mar",
        "name": "Mary Reel",
        "email": "mreel@example.com"
        },
      organization: {
        "key": "org-key-445red",
        "name" : "Hollier",
        "location": "Italy"  
      },
    },*/

    /*
    //Flash Sale off rule based - non USA location
    context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-242ply",
        "name": "Holly Barker",
        "email": "hbarker@example.com"
        },
      organization: {
        "key": "org-key-263wwc",
        "name" : "Global Designs",
        "location": "Italy"  
      },
    },
*/
    //Flash Sale on rule - US
    context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-123olp",
        "name": "Ryan Yill",
        "email": "Ryill@example.com"
        },
      organization: {
        "key": "org-key-123eed",
        "name" : "Northern Creatives",
        "location": "USA"
      },
    },

  });

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </StrictMode>,
  );
 };
 
 init();
