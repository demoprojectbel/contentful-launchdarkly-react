import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

const init = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '6838671602a68a090f0fec81', //production key goes here
    //clientSideID: '6838671602a68a090f0fec80', //test key

    context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-554ref",
        "name": "Blake White",
        "email": "blwhite@example.com"
        },
      organization: {
        "key": "organization-key-133wwe",
        "name" : "Modern Form",
        "location": "France"  
      },
    },
    
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
    },
*/
    /*
    //Flash Sale off rule based - non USA location
    context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-432rat",
        "name": "Trent Ergan",
        "email": "tergan@example.com"
        },
      organization: {
        "key": "org-key-263wwc",
        "name" : "Global Designs",
        "location": "Italy"  
      },
    },
*/
/*
    //Flash Sale on rule - US
    context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-122uuu",
        "name": "Len Br",
        "email": "lbr@example.com"
        },
      organization: {
        "key": "org-key-123eed",
        "name" : "Northern Creatives",
        "location": "USA"
      },
    },
    */
     //useProductTag targeted segment user
     /*
     context: {
      "kind": "multi",
      user: {
        "kind": "user",
        "key": "user-key-111olp",
        "name": "Aaron Poil",
        "email": "apoil@example.com"
        },
      organization: {
        "key": "org-key-445red",
        "name" : "Hollier",
        "location": "Italy"  
      },
    },
    */
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
