module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:String,
        domin:String,
        age:Number,
        city:String,
        age_range:String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Details = mongoose.model("details", schema);
    return Details;
  };
  