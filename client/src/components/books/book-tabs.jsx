import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { bookCategories } from '@/constants'

const BookTabs = ({ activeTab = 'all', onTabChange }) => {
  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={onTabChange}
      className='w-full'
    >
      <TabsList className='grid w-full grid-cols-2 md:grid-cols-4 mb-6'>
        <TabsTrigger value={'all'}>All</TabsTrigger>

        {Object.entries(bookCategories).map(([key, value]) => (
          <TabsTrigger value={key} key={key}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default BookTabs
