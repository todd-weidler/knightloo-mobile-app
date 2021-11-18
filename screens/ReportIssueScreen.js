import React, {useEffect, useState, useRef, useContext} from 'react';
import { StyleSheet, Button, Text, TextInput, View, Dimensions, Pressable, Platform, ScrollView, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LayoutAnimation} from 'react-native';
import AppContext from '../contexts/AppContext';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useHeaderHeight } from '@react-navigation/elements';

const keyboardType = Platform.OS === "ios" ? "ascii-capable": "default";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cloneDeep } from 'lodash';
// latitudeDelta: 0.015684156756595513,
// longitudeDelta: 0.008579808767251507,

// function getUTCDateFromHoursAndMins(hour, min, dayTimeType){

//     let hourMilTime = dayTimeType == "PM" ? ((hour % 12) + 12) : (hour % 12)

//     let utcDate = new Date();
//     utcDate.setUTCMonth(0);
//     utcDate.setUTCDate(1);
//     utcDate.setUTCFullYear(2021);
//     utcDate.setUTCMilliseconds(0);
//     utcDate.setUTCSeconds(0);
//     utcDate.setUTCMinutes(min);
//     utcDate.setUTCHours(hourMilTime);
    
//     return utcDate.getTime();
// }

// function convertDays(singleDayTimeslots){

//     singleDayTimeslots

//     let dayRanges = []

//     for(const day of singleDayTimeslots.days){


//     }

    









// function applyTimeslotUpdates(curRangesArr, updatedTimeslotData){

//     const startUtcInMilli = updatedTimeslotData.startUtcInMilli;
//     const endUtcInMilli = updatedTimeslotData.endUtcInMilli;
//     const etRangeStrComps = updatedTimeslotData.etRangeStr.split("-");

//     let newRangesArr = [...curRangesArr];

//     if(updatedTimeslotData.isAllDay){
//         for(const day of updatedTimeslotData.days){
//             newRangesArr[day].isAllDay = true;
//             newRangesArr[day].etRangeStr = "allday";
//         }
//     } else {

//         for(const day of updatedTimeslotData.days){
        
//             curUTCRange = curRangesArr[day];

//             let curEtRangeComps = curRangesArr[day].etRangeStr.split("-");
//             let newEtStart = curEtRangeComps[0];
//             let newEtEnd = curEtRangeComps[1];
    
//             if(curUTCRange.startUtcInMilli < startUtcInMilli){
//                 newRangesArr[day].startUtcInMilli = startUtcInMilli;
//                 newEtStart = etRangeStrComps[0];
//             }
    
//             if(curUTCRange.endUtcInMilli > endUtcInMilli){
//                 newRangesArr[day].endUtcInMilli = endUtcInMilli;
//                 newEtEnd = etRangeStrComps[1];
//             }
    
//             newRangesArr[day].isAllDay = false;
//             newRangesArr[day].etRangeStr = newEtStart + "-" + newEtEnd;
    
//         }
//     }

//     const newHOPs = convertRangesArrToHopArr(newRangesArr);

    
//     return [newRangesArr, newHOPs];
// }

// function convertRangesArrToHopArr(rangesArr){

//     // const utcRangeStrArr = utcRangeArr.map(utcRange => utcRange.isAllDay ? "allday": utcRange.startUtcInMilli + "-" + utcRange.endUtcInMilli);
//     const rangesStrArr = rangesArr.map(range => range.etRangeStr);

//     const uniqueRangeStrs = Array.from(new Set(rangesStrArr));

//     let hopArr = [];

//     for(const uniqueRangeStr of uniqueRangeStrs){
        
//         const rangeDays = rangesStrArr.map((hop, i) => hop === uniqueRangeStr ? i : -1).filter(index => index !== -1);

//         if(uniqueRangeStr === "allday"){
//             hopArr.push({
//                 days: convertDaysArrToRangeStrings(rangeDays),
//                 daysInNum: rangeDays,
//                 isAllDay: true
//             });
//             continue;
//         } else {

//             // const utcRangeComps = uniqueUTCRange.split("-");

//             // const utcStartDateObj = new Date(parseFloat(utcRangeComps[0]));
//             // const utcEndDateObj = new Date(parseFloat(utcRangeComps[1]));
    
//             // const utcStartMilHour = utcStartDateObj.getUTCHours();
//             // const utcEndMilHour = utcEndDateObj.getUTCHours();
    
//             // const {stdHour: startHour, dayTimeType: startDayTimeType} = getStandardHourDT(utcStartDateObj.getUTCHours());
//             // const {stdHour: endHour, dayTimeType: endDayTimeType} = getStandardHourDT(utcendDateObj.getUTCHours());
    
//             const etRangeComps = uniqueRangeStr.split("-");
//             const etStartComps = etRangeComps[0].split(":");
//             const etEndComps = etRangeComps[1].split(":");
//             const {stdHour: etStartHour, dayTimeType: etStartDayTimeType} =  getStandardHourDT(etStartComps[0]);
//             const {stdHour: etEndHour, dayTimeType: etEndDayTimeType} =  getStandardHourDT(etEndComps[0]);
    
//             hopArr.push({
//                 days: convertDaysArrToRangeStrings(rangeDays),
//                 daysInNum: rangeDays,
//                 isAllDay: false,
//                 startEtHour: etStartHour,
//                 startEtMin: etStartComps[1],
//                 startEtDayTime: etStartDayTimeType,
//                 endEtHour: etEndHour,
//                 endEtMin: etEndComps[1],
//                 endEtDayTime: etEndDayTimeType
//             });

//         }


//     }

// }



const updatedTimeslotDataTest = {startUtcInMilli: 0, endUtcInMilli: 0, etRangeStr: "", isAllDay: false, days: [0, 1, 5]};


const dummyTimeslots = [
    {
        days: ["Mon-Tue", "Fri"],
        daysInNum: [0, 1, 4],
        isAllDay: false,
        startEtHour: 12,
        startEtMin: 0,
        startEtDayTime: 'PM',
        endEtHour: 4,
        endEtMin: 34,
        endEtDayTime: 'PM',
        // rangeEtStr: "12:00PM-4:34PM",
        // startUtcMilli: getUTCDateFromHoursAndMins(12, 0, "PM"),
        // endUtcMilli: getUTCDateFromHoursAndMins(4, 34, "PM"),
    },
    {
        days: ["Sun"],
        isAllDay: true,
    }
];

export default function ReportIssueScreen({ navigation }) {

    const {landmarkUnderEdit, curLandmarkHopData, setCurLandmarkHopData, editedMapLocation} = useContext(AppContext);


    const [editedBathroomName, setEditedBathroomName] = useState(landmarkUnderEdit.name);


    const previewEditMapRef = useRef();

    const [mapCenter, setMapCenter] = useState(null);

    // const [editedHoursOfOpp, setEditedHoursOfOpp] = useState(dummyTimeslots);

    // const [editedRangeData, setEditedRangeData] = useState();

    function getAffectedDayIndices(rangeStrsArr){
        const dayNameToIndex = {"Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5, "Sun": 6};

        const dayIndices = rangeStrsArr.reduce((prev, curr, i) => {
            
            const days = curr.split("-").map(day => dayNameToIndex[day]);

            if(days.length !== 2){
                return prev.concat(days);
            } else {
                const fullDays = Array(days[1] - days[0] + 1).fill().map((_, idx) => days[0] + idx)
                return prev.concat(fullDays);
            }
            
        }, []);

        return dayIndices;
    }

    const handleTimeslotDelete = (i) => {

        console.log("delete pressed");

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        let timeslotsAfterDeletion = [];

        const curHopData = cloneDeep(curLandmarkHopData);

        const deletedTimeslotData = curHopData.displayableHopData[i];

        const affectedDayIndices = getAffectedDayIndices(deletedTimeslotData.days);
    
        let newFlattenedHopDataForFilteringAndMutating = curHopData.flattenedHopDataForFilteringAndMutating;

        for(const ind of affectedDayIndices){
            newFlattenedHopDataForFilteringAndMutating[ind] = null;
        }

        if(i == 0){
            console.log("here");
            timeslotsAfterDeletion = curHopData.displayableHopData.slice(1);
        } else {
            console.log("here 2");
            timeslotsAfterDeletion = curHopData.displayableHopData.slice(0, i).concat(curHopData.displayableHopData.slice(i+1));
            
        }

        console.log(timeslotsAfterDeletion);
        console.log(newFlattenedHopDataForFilteringAndMutating);

        if(timeslotsAfterDeletion && timeslotsAfterDeletion.length > 0){
            setCurLandmarkHopData({displayableHopData: timeslotsAfterDeletion, flattenedHopDataForFilteringAndMutating: newFlattenedHopDataForFilteringAndMutating});
        } else {
            setCurLandmarkHopData({displayableHopData: null, flattenedHopDataForFilteringAndMutating: newFlattenedHopDataForFilteringAndMutating});
        }

    };

    const getCenterPosition = () => {

        previewEditMapRef.current.getCamera().then(camera => {
            // console.log("cur camera: ", camera);
            previewEditMapRef.current.pointForCoordinate({latitude: camera.center.latitude, longitude: camera.center.longitude}).then(point => {
                // console.log("camera xy: ", point);
                // console.log("window width: ", Dimensions.get('window').width);
                // console.log("window height: ", Dimensions.get('window').height);
                console.log("inside getCenterPosition in report issue screen");
                setMapCenter(point);
            });
        });
    };

    
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();

    const offset = headerHeight + insets.top + 12;
    console.log(offset);
    // return (
    //     <View style={{marginTop: 0, flex:1, width: '100%', backgroundColor: 'red'}} onLayout={(event) => console.log(event.nativeEvent.layout.height, Dimensions.get('screen').height, headerHeight, insets.top)}>
    //     </View>
    // );

    return (
        // <View style={{flex: 1, backgroundColor: 'white'}}>
        // contentContainerStyle={{flexGrow: 1}} keyboardVerticalOffset={110}
        //onLayout={(event) => console.log(event.nativeEvent.layout.height, Dimensions.get('screen').height)}
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={offset}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}> 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* <View style={styles.screen}> */}
                    <>
                    <View style={styles.nameFieldContainer}>
                        <Text style={styles.fieldHeaderText}>Name</Text>
                        <View style={styles.inputContainer}>
                        <TextInput 
                            clearButtonMode={'while-editing'}
                            keyboardType={keyboardType}
                            style={styles.textInput} 
                            defaultValue={editedBathroomName}
                            autoCorrect={false}
                            onChangeText={setEditedBathroomName}
                            placeholder="Add Name" 
                            multiline={false}
                        />
                        </View>
                        
                    </View>
                    
                    {/* <View style={{flex: 1, width: '100%', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: 50, minHeight: 50, borderRadius: 25, backgroundColor: 'gold', padding: 15}}>
                            <FontAwesome5 name="toilet" size={24} color="black" style={{borderWidth: 0, position: 'relative', left: 0.5}}/>
                        </View>
                    </View> */}

                    {/* <View style={{flex: 1, width: '100%', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{position: 'relative'}}>
                            <FontAwesome5 name="map-marker" size={55} color="gold" />
                            <FontAwesome5 name="toilet" size={24} color="black" style={{position: 'absolute', zIndex: 99, margin: 'auto', top: 10, left: 0, right: 0, bottom: 0, textAlign: 'center', textAlignVertical: 'center'}}/>
                        </View>
                    </View> */}
                    <Text style={[styles.fieldHeaderText, {marginTop: 25}]}>Location</Text>


                    {true &&
                
                    <Pressable 
                    // height: '30%',
                        style={{height: Dimensions.get("window").height * 0.25,backgroundColor: 'red',  borderWidth: 0, marginTop: 8}}
                        onPress={() => {
                            console.log("Edit Location button pressed");
                            navigation.navigate("Edit Location");
                        }}
                    >
                        <View style={styles.mapContainer} pointerEvents={"none"}>
                            {/* <View style={{}} pointerEvents={"none"}> */}
                                <MapView
                                    legalLabelInsets={{top: -30, right: 0, left: 0, bottom: 0}}
                                    rotateEnabled={false}
                                    zoomEnabled={false}
                                    scrollEnabled={false}
                                    pitchEnabled={false}
                                    ref={previewEditMapRef}
                                    onMapReady={getCenterPosition}
                                    showsUserLocation={false}
                                    showsMyLocationButton={false}
                                    style={styles.map}
                                    region={{
                                        latitude: editedMapLocation.latitude,
                                        longitude: editedMapLocation.longitude,
                                        // latitude: landmarkUnderEdit.latitude,
                                        // longitude: landmarkUnderEdit.longitude,
                                        // latitudeDelta: 0.0018652108904291254,
                                        // longitudeDelta: 0.002244906182966133,
                                        latitudeDelta: 0.001,
                                        longitudeDelta: 0.002,
                                    }}
                                    // onRegionChangeComplete={(region) => console.log(region)}
                                >
                                    <MapView.Marker 
                                        coordinate={{
                                            latitude: editedMapLocation.latitude,
                                            longitude: editedMapLocation.longitude,
                                        }}
                                    />
                                </MapView>
                            {/* </View> */}

                            {/* <View style={styles.markerFixed}>
                                
                                <View style={{position: 'relative'}}>
                                        <FontAwesome5 name="map-marker" size={55} color="gold" />
                                        <FontAwesome5 name="toilet" size={24} color="black" style={{position: 'absolute', zIndex: 99, margin: 'auto', top: 10, left: 0, right: 0, bottom: 0, textAlign: 'center', textAlignVertical: 'center'}}/>
                                </View>
                            </View> */}

                            {mapCenter && 
                                <View style={[{position: 'absolute'}, {top: mapCenter.y, left: mapCenter.x, marginTop: -55, marginLeft: -20.75}]}>
                                    <View style={{position: 'relative'}} onLayout={(e) => console.log(e.nativeEvent.layout) }>
                                        <FontAwesome5 name="map-marker" size={55} color="gold" />
                                        <FontAwesome5 name="toilet" size={24} color="black" style={{position: 'absolute', zIndex: 99, margin: 'auto', top: 10, left: 0, right: 0, bottom: 0, textAlign: 'center', textAlignVertical: 'center'}}/>
                                    </View>
                                </View>
                            }

                            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '80%', bottom: 0, left: 0, right: 0, backgroundColor: '#efeeeb', borderWidth: 0}}>
                                <Text style={{paddingVertical: 0, color: 'gray'}}>Tap map to edit location</Text>
                            </View>

                            
                        </View>
                        
                    </Pressable>
                    

                        }
                        
                        {/* <Text>Location</Text>

                        <Text>Hours</Text> */}

                    {/* <View style={{flexGrow: 1, justifyContent: 'flex-start'}}> */}

                        <Text style={[styles.fieldHeaderText, {marginTop: 25}]}>Hours of Operation</Text>

                        <View style={styles.hoursOfOpertionListContainer}>
                         
                            {curLandmarkHopData != null && curLandmarkHopData.displayableHopData != null && curLandmarkHopData.displayableHopData.map((timeslot, i) => (

                                <View key={i} style={[styles.hoursOfOperationItem, {borderTopWidth: i != 0 ? 1: 0}]}>

                                           
                                    <View style={styles.daysContainer}>
                                        {timeslot.days.map(day => (
                                            <Text key={day} style={styles.dayItem}>{day}</Text>
                                        ))}
                                    </View>

                                    <View style={styles.hoursContainer}>
                                        {timeslot.isAllDay ?
                                            <Text style={styles.hourItem}>Open 24 Hours</Text> :
                                            // <Text style={styles.hourItem}>{timeslot.startEtHour}:{String(timeslot.startEtMin).padStart(2, '0')} {timeslot.startEtDayTime} - {timeslot.endEtHour}:{String(timeslot.endEtMin).padStart(2, '0')} {timeslot.endEtDayTime}</Text>
                                            <Text style={styles.hourItem}>{timeslot.etRangeStr}</Text>
                                        }
                                    </View>

                                    <Pressable onPress={() => handleTimeslotDelete(i)} style={styles.deleteTimeslotIconContainer}>
                                        <Ionicons name="ios-close-circle" size={18} color="#C8C8C8" />
                                    </Pressable>
                                </View>
                            ))}

                            <Pressable 
                                style={({ pressed }) => [
                                    {backgroundColor: pressed ? "#D0D0D0" : 'white'},
                                    
                                ]}
                                onPress={() => {
                                    console.log("Add hours button pressed");
                                    navigation.navigate("Hours of Operation")
                                }}
                            >
                                <View style={[styles.addHoursButtonContainer, {borderTopWidth: curLandmarkHopData != null && curLandmarkHopData.displayableHopData != null ? 1 : 0}] }>
                                    <Text style={styles.addHoursButtonText}>
                                        Add
                                    </Text>
                                </View>
                               
                            
                            </Pressable>
                        </View>

                   


                   



                


                </>
            </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView> 
  
    );
}


const styles = StyleSheet.create({
    scrollView: {
        // flex: 1,
        // height: 760,
        // flexGrow: 1, 
        backgroundColor: '#fff',
        // height: '100%'

    },
    screen: {
        flex: 1,
        // flexGrow: 1, 
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // marginTop: StatusBar.currentHeight || 0,
        width: '100%',
        paddingBottom: 10
        // height: '100%'
        // height: 300,
        // borderWidth: 1, 
        // borderColor: 'red'

    },
    mapContainer: {
        // flexGrow: 1, 
        // flex: 1,
        // width: '100%',
        height: '100%',
        borderTopWidth: 1,
        borderTopColor: '#D3D3D3',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        marginVertical: 0,
    },
    map: {
        // flexGrow: 1
        // flex: 1,
        // width: '100%',
        height: '100%'
    },
    markerFixed: {
        left: '50%',
        marginLeft: -20,
        marginTop: -55,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    nameFieldContainer: {
        // flex: 1,
        width: '100%',
        marginTop: 20,
    },
    fieldHeaderText: {
        color: 'gray',
        fontSize: 17,
        paddingLeft: 15,
    },
    inputContainer: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        borderTopColor: '#D3D3D3',
        borderTopWidth: 1,
        marginTop: 10,
        paddingHorizontal: 15,
    },
    textInput: {
        fontSize: 17,
    
        // borderBottomColor: '#D3D3D3',
        // borderBottomWidth: 1,
        // borderTopColor: '#D3D3D3',
        // borderTopWidth: 1,
        paddingVertical: 18,
        // paddingHorizontal: 15,
        // marginVertical: 10,
        // marginRight: 10
        // paddingRight: 50
    },
    hoursOfOpertionListContainer: {
        // flex: 1,
        // width: 50,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        borderTopColor: '#D3D3D3',
        borderTopWidth: 1,
        marginVertical: 10,
        // paddingLeft: 18,

        // borderWidth: 1,
        // borderColor: 'red'
        // justifyContent: 'center'
    },
    hoursOfOperationItem: {
        // width: '100%',
        // flex:1,
        flexDirection: 'row',
        // justifyContent: 'center'
        // backgroundColor: 'green'
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopColor: '#D3D3D3',
        // paddingLeft: 18
        marginLeft: 18
    },
    daysContainer: {
        // flex: 1,
        // flexDirection: 'column',
        // borderWidth: 1,
        width: '20%',
        marginRight: 0,
        // flexGrow: 1
    },
    dayItem: {
        paddingVertical: 2,
        fontSize: 17
    },
    hoursContainer: {
        // justifyContent: 'flex-start',
        // borderWidth: 1,
        // flexGrow: 1
    },
    hourItem: {
        fontSize: 17,
        fontWeight: '600'
    },
    deleteTimeslotIconContainer: {
        // paddingRight: 15,
        marginRight: 15,
        // borderWidth: 1
    },
    addHoursButtonContainer: {
        // width: '100%',
        paddingVertical: 14,
        borderTopColor: '#D3D3D3',
        // borderTopWidth: 1,
        marginLeft: 18
    },
    addHoursButtonText: {
        color: '#007bff',
        fontSize: 17,
        elevation: 3,
    }

});