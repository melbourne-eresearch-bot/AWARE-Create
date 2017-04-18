try {
    Template.studySchedule.onCreated(function() {
        var self = this;
        self.autorun(function() {
            var id = FlowRouter.getParam('id');
            self.subscribe('singleStudy', id);
        });
    });

    AutoForm.addHooks("updateSchedule", {
        onSuccess: function(formType, result) {

            var id = FlowRouter.getParam('id');
            study = Studies.findOne({
                _id: id
            });
            // TODO: active sensors depending on user choices
            //console.log(study.context.contextType);

            FlowRouter.go("/study/:id/sensor", {
                id: FlowRouter.getParam('id')
            });
        }
    });

    AutoForm.addHooks(null, {
        before: {
            update: function(doc) {
                _.each(doc.$set, function(value, setter) {
                    if (_.isArray(value)) {
                        var newValue = _.compact(value);
                        doc.$set[setter] = newValue;
                    }
                });
                return doc;
            }
        }
    });

    Template.registerHelper("questionsCheckbox", function() {
        var id = FlowRouter.getParam('id');
        study = Studies.findOne({
            _id: id
        });
        var options = [];
        if (typeof study != "undefined") {
            for (i = 0; i < study.questions.length; i++) {
                var json = {};
                json["label"] = "Q" + (i + 1) + " - " + study.questions[i].question;
                json["value"] = i;
                options[i] = json;
            }
            return options;
        }
    });

    Template.registerHelper('incremented', function(index) {
        index++;
        return index;
    });

    Template.studySchedule.helpers({
        study: () => {
            var id = FlowRouter.getParam('id');
            return Studies.findOne({
                _id: id
            });
        },
        updateStudyId: function() {
            var id = FlowRouter.getParam('id');
            return Studies.findOne({
                _id: id
            });
        }
    });

} catch (err) {
    console.log(err);
}