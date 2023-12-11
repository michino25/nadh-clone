/* eslint-disable react-hooks/exhaustive-deps */
import {
  SearchOutlined,
  EyeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  Pagination,
  Button,
  Space,
  Table,
  Flex,
  Dropdown,
  Skeleton,
} from "antd";
import { iUser } from "../../utils/models";
import type { ColumnType, ColumnsType } from "antd/es/table";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import SearchNumber from "./SearchNumber";
import { getColByKey, rawColumnsByTable } from "_constants/index";
import SearchSelect from "./SearchSelect";
import SearchDate from "./SearchDate";
import useFilter from "src/hooks/useFilter";
import SearchMultiSelect from "./SearchMultiSelect";
import SearchIndustry from "./SearchIndustry";
import SearchAddress from "./SearchAddress";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

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

const DataTable = ({
  titleTable,
  tableName,
  data,
  filterSelectData,
  rawColumns,
  showDetail,
  createBtn,
  paginationOption,
  noFilter,
}: DataTableProps) => {
  const { getAllParams, removeAllFilter, getPathname } = useFilter();
  const [filterCol, setFilterCol] = useState(
    rawColumnsByTable(tableName).map((column: any) => column.key)
  );

  const getColumnSearchProps = (columnKey: string): ColumnType<DataType> => {
    const col = getColByKey(rawColumns, columnKey);
    if (!noFilter)
      return {
        filterDropdown: () => (
          <>
            {!col.type && (
              <SearchInput table={tableName} columnKey={columnKey} />
            )}

            {col.type === "number" && <SearchNumber columnKey={columnKey} />}

            {col.type === "select" && (
              <SearchSelect
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "industry" && (
              <SearchIndustry columnKey={columnKey} />
            )}

            {col.type === "address" && <SearchAddress />}

            {col.type === "multiple_select" && (
              <SearchMultiSelect
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "date" && <SearchDate columnKey={columnKey} />}
          </>
        ),
        filterIcon: () => {
          return (
            <SearchOutlined
              style={{
                color:
                  Object.keys(getAllParams()).filter(
                    (item) => item.replace(/_(from|to)$/, "") === columnKey
                  ).length > 0
                    ? "#1677ff"
                    : undefined,
              }}
            />
          );
        },
      };
    else return {};
  };

  const [render, setRender] = useState(true);

  const changeCol = async (data: any) => {
    try {
      const res = await otherApi.changeCol(getPathname().slice(1), data);
      setFilterCol(res.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const loginMutation = useMutation({
    mutationFn: (formData: any) => changeCol(formData),
  });

  const handleMenuSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    console.log("Selected keys:", selectedKeys);
    loginMutation.mutate(selectedKeys);
    setRender(!render);
  };

  const items = rawColumns.map((column: any, index: number) => ({
    disabled: index === 0 || index === 1,
    key: column.key,
    label: column.title,
  }));

  const { isPending: colIsPending, data: colData } = useQuery({
    queryKey: ["col"],
    queryFn: async () =>
      await otherApi
        .getCol(getPathname().slice(1))
        .then((res: any) => res.data.data),
    enabled: getPathname() === "/candidates" || getPathname() === "/clients",
  });

  useEffect(() => {
    if (getPathname() === "/candidates" || getPathname() === "/clients") {
      setFilterCol(colData);
    }
  }, [colIsPending]);

  console.log(filterCol);

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => filterCol && filterCol.includes(column.key))
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
          <>
            <Button onClick={createBtn.handler}>{createBtn.title}</Button>
            <Dropdown
              menu={{
                items: [
                  ...items,
                  {
                    disabled: true,
                    key: "action",
                    label: "Action",
                  },
                ],
                selectable: true,
                multiple: true,
                defaultSelectedKeys: filterCol,
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
          </>
        )}
        {!noFilter && (
          <Button onClick={() => removeAllFilter()}>Clear All Filters</Button>
        )}{" "}
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

  if (
    colIsPending &&
    (getPathname() === "/candidates" || getPathname() === "/clients")
  )
    return <Skeleton active />;

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
