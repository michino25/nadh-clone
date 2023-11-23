import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useRef, useState } from "react";
import { Pagination, Button, Input, Space, Table, Flex, Dropdown } from "antd";
import { EyeOutlined, CaretDownOutlined } from "@ant-design/icons";
import { iUser } from "../../utils/models";
import type { FilterConfirmProps, Key } from "antd/es/table/interface";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { InputRef } from "antd";

type DataType = iUser;
type DataIndex = keyof DataType;

interface Column {
  key: string;
  title: string;
}

interface DataTableProps {
  titleTable: string;
  data: any[];
  rawColumns: Column[];
  showDetail: () => void;
  setIdDetail: (id: string) => void;
  paginationOption?: {
    currentPage: number;
    handlePageChange: (page: number) => void;
    total: number;
    pageSize: number;
  };
}

const DataTable: React.FC<DataTableProps> = ({
  titleTable,
  data,
  rawColumns,
  showDetail,
  setIdDetail,
  paginationOption,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [selectedKeys, setSelectedKeys] = useState<Key[] | string[]>(
    rawColumns.map((column: Column) => column.key)
  );

  const handleMenuSelect = ({
    selectedKeys,
  }: {
    selectedKeys: React.Key[];
  }) => {
    console.log("Selected keys:", selectedKeys);
    setSelectedKeys(selectedKeys);
  };

  // eslint-disable-next-line
  const items = rawColumns.map((column: Column) => ({
    key: column.key,
    label: column.title,
  }));

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => selectedKeys.includes(column.key))
      .map((column) => ({
        ...column,
        dataIndex: column.key,
        ...getColumnSearchProps(column.key),
      }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <button
          onClick={() => {
            showDetail();
            setIdDetail(id);
          }}
        >
          <EyeOutlined />
        </button>
      ),
    });
  }

  const header = (
    <Flex justify="space-between">
      <span className="text-xl font-bold">
        {titleTable} ({paginationOption?.total})
      </span>
      <Flex gap="middle">
        <Dropdown
          menu={{
            items,
            selectable: true,
            multiple: true,
            defaultSelectedKeys: selectedKeys as string[],
            onSelect: handleMenuSelect,
            onDeselect: handleMenuSelect,
          }}
        >
          <Button className="flex items-center justify-center">
            Custom Column
            <CaretDownOutlined />
          </Button>
        </Dropdown>

        <Button
        // onClick={clearFilters}
        >
          Clear filters
        </Button>
      </Flex>
    </Flex>
  );

  const footer = paginationOption && (
    <div className="flex justify-end">
      <Pagination
        current={paginationOption.currentPage}
        onChange={paginationOption.handlePageChange}
        total={paginationOption.total}
        pageSize={paginationOption.pageSize}
        showSizeChanger={false}
      />
    </div>
  );

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>

      <Table
        className="w-full"
        title={() => header}
        footer={() => footer}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default DataTable;
