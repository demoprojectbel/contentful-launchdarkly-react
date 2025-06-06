# React App 

Clone the repository to your local machine
```
$ git clone https://github.com/launchdarkly-labs/contentful-launchdarkly-react.git
$ cd contentful-launchdarkly
$ npm install
$ npm run dev
```

Load http://localhost:5173/ in your browser and you will see the new LaunchDarkly Studio website.

### See Feature flags in action
Jump into the LaunchDarkly project

#### compact-grid Feature Flag

Toggle the compact-grid feature flag **On** to display two images in one row.  Toggle the flag **Off** to display one image per row.  You can toggle the compact-grid feature flag [here](https://app.launchdarkly.com/projects/default/flags/Compact-grid/targeting?env=production&selected-env=production)


---

#### Flag Evaluation: useFlashSale

The useFlashSale flag is configured to target:

- An individual user: Mary Reed
- Any organization where the location attribute is USA

When the flag is evaluated to True, the "Almost Gone!" notice will appear on items by Normann Copenhagen. In all other cases the flag serves false and the notice is hidden.

#### Individual Targeting:
In main.jsx, lines 14-27 define a multi context that includes the user Mary Reed.  Because she is individually targeted, the flag evaluates to True and the "Almost Gone!" notice appears.

#### Rule Based Targeting
**Test Case A:**

- Comment out lines 14-27
- Uncomment lines 31-44

The Organization's Location is not USA; the flag evaluates to false and the "Almost Gone!" notice is not shown

**Test Case B:**

- Comment out lines 31-44
- Uncomment lines 48-61

The Organizations's location is USA; the flag evaluates to true and the "Almost Gone!" notice appears.
  


