import { Col, Row, Select, Slider } from "antd";
import { useQuery } from "react-query";
import { getPetFilter } from "../apis/petApi";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchCurrentValue, setSearchBarCurrentValue } from "../store/searchBarSlice";
import { useEffect } from "react";

const options = [
    // {
    //     label: "Please select",
    //     value: ""
    // }
]

const genderOptions = [
    ...options,
    {
        label: "Male",
        value: "Male"
    },
    {
        label: "Female",
        value: "Female"
    }
]

const favouriteOptions = [
    ...options,
    {
        label: "Liked",
        value: 1
    },
    {
        label: "Not Like",
        value: 0
    }
]

const SearchBar = ({ isAdmin }) => {
    const searchCurrent = useSelector(selectSearchCurrentValue)
    const dispatch = useDispatch()

    const { data: petFilter, isLoading } = useQuery({
        queryKey: ['petFilter'],
        queryFn: getPetFilter,
        select: (data) => {
            return {
                varieties: [...options, ...data.varieties.map(x => ({ label: x, value: x }))],
                age: {
                    min: data.minAge,
                    max: data.maxAge
                },
                gender: genderOptions,
                favourite: favouriteOptions
            }
        },
        staleTime: Infinity
    })

    const varietyOnSelect = (e) => {
        dispatch(setSearchBarCurrentValue({ variety: e }))
    }

    const genderOnSelect = (e) => {
        dispatch(setSearchBarCurrentValue({ gender: e }))
    }

    const favouriteOnSelect = (e) => {
        dispatch(setSearchBarCurrentValue({ favourite: e }))
    }

    const ageRangeOnDrag = (e) => {
        dispatch(setSearchBarCurrentValue({
            age: {
                min: e[0],
                max: e[1]
            }
        }))
    }

    useEffect(() => {
        if (petFilter && petFilter.age) {
            dispatch(setSearchBarCurrentValue({
                age: {
                    min: petFilter.age.min,
                    max: petFilter.age.max
                }
            }))
        }
    }, [petFilter])

    if (isLoading) return ""

    const colStyle = {
        paddingRight: "15px",
        lineHeight: "50px"
    }

    const selectStyle = {
        minWidth: "150px"
    }

    const isFavouriteSelect = !isAdmin ?
        (<Col style={colStyle}>
            <Select style={selectStyle} allowClear placeholder="Select Favourite" value={searchCurrent.favourite} options={petFilter.favourite} onChange={favouriteOnSelect} />
        </Col>) : ""
    return (
        <>
            <div style={{
                background: "white",
                margin: "10px",
                padding: "10px"
            }}>
                <div style={{ margin: "0 0 0 10px", fontSize: "20px" }}><SearchOutlined /> Search</div>
                <Row style={{
                    width: "100%"
                }}>
                    <Col style={colStyle}>
                        <Select style={selectStyle} allowClear placeholder="Select Variety" value={searchCurrent.variety} options={petFilter.varieties} onChange={varietyOnSelect} />
                    </Col>
                    <Col style={colStyle}>
                        <Select style={selectStyle} allowClear placeholder="Select Gender" value={searchCurrent.gender} options={petFilter.gender} onChange={genderOnSelect} />
                    </Col>
                    {isFavouriteSelect}
                    <Col span={4}>
                        <span>Age: </span>
                        <Slider range
                            value={[searchCurrent.age.min, searchCurrent.age.max]}
                            onChange={ageRangeOnDrag}
                            min={petFilter.age.min}
                            max={petFilter.age.max}
                            defaultValue={[petFilter.age.min, petFilter.age.max]} />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default SearchBar;