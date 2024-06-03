const AllData = require("../model/Api_Data");
const Watch_List = require("../model/Watch_List");

exports.getAllData = async (req, res) => {
  try {
    const record = await AllData.find();
    res.status(200).json({
      status: 200,
      apidata: record,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

exports.singleDataDetail = async (req, res) => {
  try {
    const { singleDataName } = req.body;

    const watchListRecord = await AllData.findOne({ name: singleDataName });

    if (watchListRecord) {
      res.status(200).json({
        status: 200,
        apidata: watchListRecord,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Data record not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.singleDataSuggestion = async (req, res) => {
  try {
    const { singleDataName } = req.body;

    const singleDataRecord = await AllData.findOne({ name: singleDataName });
    const newRecord = await AllData.find({
      genres: { $all: singleDataRecord.genres },
    });

    res.status(200).json({
      status: 200,
      apidata: newRecord,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.watchListId = async (req, res) => {
  try {
    const firstName = req.params.firstName;
    const { ids } = req.body;

    async function processIds(ids) {
      const responses = [];

      for (let propt of ids) {
        const record = await AllData.findById(propt);
        const existingRecord = await Watch_List.findOne({ name: record.name });

        if (!existingRecord) {
          if (record) {
            const result = new Watch_List({
              firstName: firstName,
              name: record.name,
              type: record.type,
              language: record.language,
              genres: record.genres,
              runtime: record.runtime,
              premiered: record.premiered,
              ended: record.ended,
              officialSite: record.officialSite,
              rating: {
                average: record.rating.average,
              },
              image: {
                medium: record.image.medium,
                original: record.image.original,
              },
              summary: record.summary,
            });
            await result.save();
            responses.push({
              status: 200,
              message: `Data Inserted Successfully for ID ${propt}`,
            });
          }
        } else {
          responses.push({
            status: 400,
            message: `Record with ID ${propt} already exists. Skipping...`,
          });
        }
      }
      return responses;
    }

    const responses = await processIds(ids);
    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.watchListData = async (req, res) => {
  try {
    const firstName = req.params.firstName;
    const record = await Watch_List.find({ firstName: firstName });
    res.status(200).json({
      status: 200,
      apidata: record,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.watchListItemCount = async (req, res) => {
  try {
    const { firstName } = req.body;

    if (firstName === 0) {
      return res.status(400).json({
        status: 400,
        message: "Invalid firstName value",
      });
    }

    const record = await Watch_List.aggregate([
      {
        $group: {
          _id: { firstName: firstName },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: 200,
      apidata: record,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Something Went Wrong",
    });
  }
};

exports.watchListDataDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Watch_List.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: "Data Removed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 200,
      message: error.message,
    });
  }
};

// exports.searchItem = async (req, res) => {
//     try {
//         const { searchedData } = req.body;

//         const regex = new RegExp(searchedData.split('').join('.*'), 'i');

//         const searchData = await AllData.find({ name: { $regex: regex } });

//         res.status(200).json({
//             status: 200,
//             apidata: searchData
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 400,
//             message: error.message
//         });
//     }
// };
