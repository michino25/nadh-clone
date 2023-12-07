import {
  SearchOutlined,
  EyeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Pagination, Button, Space, Table, Flex, Dropdown } from "antd";
import { iUser } from "../../utils/models";
import type { ColumnType, ColumnsType } from "antd/es/table";
import SearchInput from "./SearchInput";
import { changeCustomColumn } from "utils/filter";
import { getStore } from "utils/localStorage";
import { useState } from "react";
import SearchNumber from "./SearchNumber";
import { getColByKey } from "_constants/index";
import SearchSelect from "./SearchSelect";
import SearchDate from "./SearchDate";
import useFilter from "src/hooks/useFilter";
import SearchMultiSelect from "./SearchMultiSelect";

type DataType = iUser;

interface DataTableProps {
  titleTable: string;
  tableName: string;
  data: any[];
  filterSelectData?: any;
  rawColumns: any[];
  createBtn: { handler: () => void; title: string } | undefined;
  showDetail: (id: string) => void;
  paginationOption?: {
    handlePageChange: (page: number) => void;
    total: number;
    pageSize: number;
  };
  noFilter?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  titleTable,
  tableName,
  data,
  filterSelectData,
  rawColumns,
  showDetail,
  createBtn,
  paginationOption,
  noFilter,
}) => {
  const { getAllParams, removeAllFilter } = useFilter();

  const getColumnSearchProps = (columnKey: string): ColumnType<DataType> => {
    if (!noFilter)
      return {
        filterDropdown: () => (
          <>
            {!getColByKey(rawColumns, columnKey).type && (
              <SearchInput table={tableName} columnKey={columnKey} />
            )}

            {getColByKey(rawColumns, columnKey).type === "number" && (
              <SearchNumber columnKey={columnKey} />
            )}

            {getColByKey(rawColumns, columnKey).type === "select" && (
              <SearchSelect
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {getColByKey(rawColumns, columnKey).type === "multiple_select" && (
              <SearchMultiSelect
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {getColByKey(rawColumns, columnKey).type === "date" && (
              <SearchDate columnKey={columnKey} />
            )}
          </>
        ),
        filterIcon: () => (
          <SearchOutlined
            style={{
              color: Object.keys(getAllParams()).includes(columnKey)
                ? "#1677ff"
                : undefined,
            }}
          />
        ),
      };
    else return {};
  };

  const [render, setRender] = useState(true);

  const handleMenuSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    console.log("Selected keys:", selectedKeys);
    changeCustomColumn(tableName, selectedKeys);
    setRender(!render);
  };

  const items = rawColumns.map((column: any) => ({
    key: column.key,
    label: column.title,
  }));

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => getStore(tableName).col.includes(column.key))
      .map((column) => ({
        ...column,
        dataIndex: column.key,
        ...getColumnSearchProps(column.key),
        render: (data: any) => (
          <>
            {Array.isArray(data) ? (
              data.map((item, index) => (
                <p className="mb-1" key={index}>
                  {item}
                </p>
              ))
            ) : (
              <>{data}</>
            )}
          </>
        ),
      }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <button
          onClick={() => {
            showDetail(id);
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
        {createBtn && !noFilter && (
          <Button onClick={createBtn.handler}>{createBtn.title}</Button>
        )}

        <Dropdown
          menu={{
            items,
            selectable: true,
            multiple: true,
            defaultSelectedKeys: getStore(tableName).col,
            onSelect: handleMenuSelect,
            onDeselect: handleMenuSelect,
          }}
        >
          <Button>
            <div className="flex items-center justify-center">
              <span className="pr-1">Custom Column</span>
              <CaretDownOutlined />
            </div>
          </Button>
        </Dropdown>

        <Button onClick={() => removeAllFilter()}>Clear filters</Button>
      </Flex>
    </Flex>
  );

  console.log(getAllParams().page);

  const footer = paginationOption && (
    <div className="flex justify-end">
      <Pagination
        current={getAllParams().page ? parseInt(getAllParams().page) : 1}
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
        scroll={{ x: true }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default DataTable;
