import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

/*
    Generating flowchart using GPT API:
    * Iterate through the header and check what procedure it is
        * Assign the step to a certain block  
    * Iteratively generate blocks in rows and columns from the children (kind of like a tree!)
        * Ex.
        - If a procedure is a decision, generate true and false blocks in a row and possibly generate more
          blocks if something is true or false
        * Output ex. to convert as a flowchart:
          <p>Step 3: Create the pipes (Procedure: Sequence)</p>
            * <li>Load the pipe image</li>
            * <li>Define the gap size between the pipes</li>
            * <li>Generate a random height for the gap</li>
            * <li>Set the initial position of the pipes</li>
    * Enable the user to edit the flowchart
        * Add an edit button for each flowchart response
            * Make it a page (may use redux for this)
                * Save all of the content: View, Text, etc
                * Allow dragging the blocks to certain areas of the page
                  by a hold and finger drag (also enables the user to edit content of the block)
                 
*/
export default function CustomFlowChart({ inputs }) {
    console.log("Generate flowchart");
    // Initialize the blockStyle state as an array of objects with default style
    let style = {
        backgroundColor: "rgb(59 130 246)",
        borderRadius: 16,
        transform: "rotate(0deg)",
    };
    const [blockStyle, setBlockStyle] = useState(
        inputs.map(() => ({ ...style, }))
    );

    useEffect(() => {
        const changeBlockDesign = () => {
            // Use map() to return a new array of objects with updated styles
            const newBlockStyle = inputs.map((output) => {

                // Check for specific conditions and update style accordingly
                if (output[0] !== "") {
                    console.log("This is the first element");
                }
                if (output === "Condition") {
                    console.log("It's a decision!");
                    style = {
                        backgroundColor: "rgb(239 68 68)",
                        borderRadius: 0,
                        width: 90,
                        height: 90,
                        transform: "rotate(45deg)",
                        textTransform: "rotate(45deg)",
                    };
                }

                if (output === "Process") {
                    console.log("It's a process!");
                    style = {
                        backgroundColor: "rgb(234 179 8)",
                        borderRadius: 9999,
                        transform: "rotate(0deg)", // Adjust as needed
                    };
                }

                if (output === "End") {
                    style = {
                        backgroundColor: "rgb(109 40 217)",
                        borderRadius: 16
                    }
                }
                return style;
            });
            setBlockStyle(newBlockStyle);
        };

        changeBlockDesign();
    }, [inputs]);

    return (
        <>
            <View className="flex flex-col relative justify-center items-center right-11">
                {inputs.map((output, key) => (
                    <React.Fragment key={key}>
                        {output[0] === "" && <View className="w-1 h-16 bg-black block -z-10" />}
                        {/* Use the blockStyle array to access the style object for each element */}
                        {output === 'Condition' ? (
                            <View className='flex-row items-center'>
                                <View className="w-20 h-14 justify-center items-center bg-orange-500 rounded-2xl">
                                    <Text className='text-white'>True</Text>
                                </View>
                                <View className="w-16 h-1 bg-black block -z-10" />
                                <FlowChartBlocks key={key} output={output} style={blockStyle[key]} />
                                <View className="w-16 h-1 bg-black block -z-10" />
                                <View className="w-20 h-14 justify-center items-center bg-orange-500 rounded-2xl">
                                    <Text className='text-white'>False</Text>
                                </View>
                            </View>
                        ) : (
                            <FlowChartBlocks key={key} output={output} style={blockStyle[key]} />
                        )}
                        {key !== output.length && <View className="w-1 h-16 bg-black block -z-10" />}
                    </React.Fragment>
                ))}
            </View>
        </>
    );
}

function FlowChartBlocks({ output, style }, key) {
    return (
        <View
            style={style}
            className="w-32 h-14 justify-center items-center"
            key={`${key}_flowchart`}
        >
            <Text className={`text-white ${output === "Decision" && '-rotate-45'}`} key={`${key}_outText`}>
                {output}
            </Text>
        </View>
    )
}
