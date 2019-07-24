const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = require('./company');

/**
 * Schema Notes:
 * 
 * Unit: The Unit resource is a generic term for a rentable space.
 *      kind: (Required) The kind of unit available. Only the following options should be allowed: "seat", "desk", "small office", "large office", "floor".
 *      floor: (Required) An integer which represents the floor the rentable unit is on.
 *      special_monthly_offer: An optional integer field. If filled in, represents a special deal that the company will be paying in cents. For example, if the unit is being leased for $600/mo, this field would be 600000.
 *      company: The Company resource, refer to schema in ./api/models/company.js
 *      
 */

 /**
  * Schema
  * Note: I originally built out the company and employee schemas to seperate model files, but out of frustration with bugs i encountered i opted to build out the full schema in this unit.js file once more. 
  * I also opted out of frustration/rush to build all the routes out in the units.js file rather than separate routes. I have however uploaded the additional model files
*/

const schema = new Schema({
    unit: {
        kind: {
            type: String,
            required: true
        },
        floor: {
            type: Number,
            required: true
        },
        special_monthly_offer: Number,
        company: {
            name: {
                type: String,
                required: false
            },
            contact_email: {
                type: String,
                required: false
            },
            employee: [{
                first_name: {
                    type: String,
                    required: false
                },
                last_name: {
                    type: String,
                    required: false
                },
                preferred_name: String,
                position: String,
                birthday: String,
                email: {
                    type: String,
                    required: false
                }
            }]
        }
    }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

  module.exports = mongoose.model('Unit', schema);
