const {merge} = require("webpack-merge");

class MergeablePlugin{

    constructor(moduleClass,props) {
        this.moduleClass = moduleClass;
        this.props = props;
    }

}
function MergeConfigWithMergeablePlugin(a, b, key){
            // merge elements of type "MergeablePlugin"
            if (key === "plugins") {
                const a_cantBeMerged = a.filter((entry) => entry.constructor !== MergeablePlugin)
                const b_cantBeMerged = b.filter((entry) => entry.constructor !== MergeablePlugin)
                let elementsToMerge = [
                    ...a.filter((entry) => entry.constructor === MergeablePlugin),
                    ...b.filter((entry) => entry.constructor === MergeablePlugin)
                ]

                const mergeRes = []
                while (elementsToMerge.length) {
                    const element = elementsToMerge.shift()

                    const elementsOfSameType = elementsToMerge.filter(e => e.moduleClass.constructor === element.moduleClass.constructor)
                    elementsToMerge = elementsToMerge.filter(e => e.moduleClass.constructor !== element.moduleClass.constructor)

                    const mergedProps = merge(element.props, ...elementsOfSameType.map(e => e.props))
                    mergeRes.push(new element.moduleClass(mergedProps))
                }


                return [...a_cantBeMerged, ...b_cantBeMerged, ...mergeRes];

            }
            return undefined
}

module.exports = {MergeablePlugin , MergeConfigWithMergeablePlugin}
