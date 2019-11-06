const WebsiteSchema = require('../db_schemas/website_schema');

// eslint-disable-next-line no-unused-expressions
'use strict';

function saveToDb(propertyData) {
  return new Promise((resolve, reject) => {
    const property = new WebsiteSchema(propertyData);
    property.save((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function updateProperty(propertyUrl, updateData) {
  return new Promise((resolve, reject) => {
    WebsiteSchema.findOneAndUpdate({
        url: propertyUrl,
      }, updateData, {
        new: true,
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  });
}

function checkIfExists(propertyUrl) {
  return new Promise((resolve, reject) => {
    WebsiteSchema.find({ url: propertyUrl }, (err, url) => {
      if (err) {
        reject(err);
      } else if (url.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

// TODO: Create function to search all Websites based on object of options and return an array of those objects returned.

const propertyActions = {
  save: (req, res) => {
    checkIfExists(req.body.url).then((exists) => {
      if (exists) {
        const alreadyExists = {
          success: false,
          message: 'Property already exists',
        };
        res.send(JSON.stringify(alreadyExists));
      } else if (!exists) {
        saveToDb(req.body).then((saved) => {
          // eslint-disable-next-line no-console
          console.log(saved);
          const savedMessage = {
            success: true,
            message: 'Successfully saved to database',
          };
          res.send(JSON.stringify(savedMessage));
        }).catch((err) => {
          throw err;
        });
      }
    }).catch((err) => {
      throw err;
    });
  },

  update: (req, res) => {
    checkIfExists(req.body.url).then((exists) => {
      if (!exists) {
        res.send(JSON.stringify({ success: false, message: 'Property does not exists' }));
      } else if (exists) {
        updateProperty(req.body.url, req.body.values).then((saved) => {
          // eslint-disable-next-line no-console
          console.log(saved);
          res.send(JSON.stringify({ success: true, message: 'Successfully updated property' }));
        }).catch((err) => {
          throw err;
        });
      }
    }).catch((err) => {
      throw err;
    });
  },

  // eslint-disable-next-line no-unused-vars
  search: (req, res) => {

  }
};

module.exports = propertyActions;
