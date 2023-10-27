import {Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../hooks/useAuth.js";
import {useCustomForm} from "../hooks/useCustomForm.js";
import Button from "./button.jsx";
import Label from "./label.jsx";
import Input from "./input.jsx";

export default function Filter({modal}){
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [author, setAuthor] = useState("");
    const [sourceOptions, setSourceOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const {user} = useAuth();

    const {
        state,
        setState,
        isSubmitting,
        isDisabled,
        setIsDisabled,
        handleChange,
        handleSubmit
    } = useCustomForm({
        sources: [],
        categories: [],
        author: "",
    }, async (formData) => {
        let formURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/preferences`;

        const res = await axios.post(formURL, formData, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                Accept: "application/json",
            },
        });

        if (res.status === 200) {
            modal.onClose();
        }
    });

    const fetchSources = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });
            setSourceOptions(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchCategories = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });
            setCategoryOptions(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });

            if(response.status === 200){
                if (url.includes("sources")) {
                    const sourceArray = response.data.data.map(item => item.source);
                    setSources(sourceArray);
                } else if (url.includes("categories")) {
                    const categoryArray = response.data.data.map(item => item.category);
                    setCategories(categoryArray);
                }else if (url.includes("authors")) {
                    const lastAuthorIndex = response.data.data.length - 1;
                    setAuthor(response.data.data[lastAuthorIndex].author);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchSources(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sources`);
        fetchCategories(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
        fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/preferred-authors`);
        fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/preferred-categories`);
        fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/preferred-sources`);
    }, []);

    useEffect(()=>{
        setState({
            sources: sources,
            categories: categories,
            author: author,
        });
    }, [sources, categories, author, setState]);

    return (
        <>
            <Modal isOpen={modal.isOpen} onClose={modal.onClose} size={"4xl"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
                                <ModalBody>
                                    <div className="mb-3">
                                        <Label htmlFor="filter_source" className="block text-sm font-medium text-gray-700"
                                               value={"Source"}/>
                                        <Select
                                            id={"filter_source"}
                                            aria-label={"select source"}
                                            selectionMode="multiple"
                                            placeholder="Select source"
                                            selectedKeys={state.sources}
                                            className="border border-gray-300 mt-1 bg-white text-gray-600 text-base font-medium focus:shadow-md focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 block w-full p-2.5 outline-none"
                                            onSelectionChange={(e)=>{
                                                if (e.size > 0) {
                                                    setIsDisabled(false);
                                                } else {
                                                    setIsDisabled(true);
                                                }
                                                setState({
                                                    ...state,
                                                    ["sources"]: [...e],
                                                });
                                            }}
                                            renderValue={(items) => {
                                                return (
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.map((item) => {
                                                            return <Chip key={item.key}>{sourceOptions[item.key]}</Chip>
                                                        })}
                                                    </div>
                                                );
                                            }}
                                        >
                                            {Object.keys(sourceOptions).map((key) => (
                                                <SelectItem key={key} value={key}>
                                                    {sourceOptions[key]}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <Label htmlFor="filter_category" className="block text-sm font-medium text-gray-700"
                                               value={"Category"}/>
                                        <Select
                                            id={"filter_category"}
                                            aria-label={"select category"}
                                            selectionMode="multiple"
                                            placeholder="Select category"
                                            selectedKeys={new Set(state.categories)}
                                            className="border border-gray-300 mt-1 bg-white text-gray-600 text-base font-medium focus:shadow-md focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 block w-full p-2.5 outline-none"
                                            onSelectionChange={(e)=>{
                                                if (e.size > 0) {
                                                    setIsDisabled(false);
                                                } else {
                                                    setIsDisabled(true);
                                                }
                                                setState({
                                                    ...state,
                                                    ["categories"]: [...e],
                                                });
                                            }}
                                            name={"sources"}
                                            renderValue={(items) => {
                                                return (
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.map((item) => {
                                                            return <Chip key={item.key}>{item.textValue}</Chip>
                                                        })}
                                                    </div>
                                                );
                                            }}
                                        >
                                            {categoryOptions.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <Label htmlFor="filter_author" className="block text-sm font-medium text-gray-700"
                                               value={"Author"}/>
                                        <Input id="filter_author" className="block mt-1 w-full" type="text" name="author"
                                               placeholder="Filter by author"
                                               value={state.author}
                                               onChange={handleChange}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="ml-4 border inline-flex justify-between relative items-center py-2 px-3 shadow-sm rounded-lg  text-center text-base font-medium leading-5 text-gray-600 outline-none"  onClick={onClose}>
                                        Cancel
                                    </button>
                                    <Button disabled={isDisabled} isLoading={isSubmitting}>
                                        Filter
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}