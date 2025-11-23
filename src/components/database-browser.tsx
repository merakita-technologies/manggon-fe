// components/database-browser.tsx
import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Database, Server, Table } from "lucide-react"

const sampleData = {
  servers: [
    {
      name: 'Production DB',
      type: 'postgresql',
      status: 'connected',
      databases: [
        {
          name: 'ecommerce',
          tables: ['users', 'products', 'orders', 'categories']
        },
        {
          name: 'analytics',
          tables: ['events', 'sessions', 'metrics']
        }
      ]
    },
    {
      name: 'Development DB',
      type: 'postgresql',
      status: 'connected',
      databases: [
        {
          name: 'test_db',
          tables: ['test_table1', 'test_table2']
        }
      ]
    }
  ]
}

export function DatabaseBrowser() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const renderTree = () => {
    return sampleData.servers.map((server, serverIndex) => (
      <div key={serverIndex} className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start h-8 px-2"
          onClick={() => toggleItem(`server-${serverIndex}`)}
        >
          {expandedItems[`server-${serverIndex}`] ? 
            <ChevronDown className="h-3 w-3 mr-1" /> : 
            <ChevronRight className="h-3 w-3 mr-1" />
          }
          <Server className="h-3 w-3 mr-2 text-green-500" />
          <span className="text-sm font-medium flex-1 text-left">{server.name}</span>
          <Badge variant="secondary" className="text-xs">
            {server.status}
          </Badge>
        </Button>
        
        {expandedItems[`server-${serverIndex}`] && (
          <div className="ml-4 space-y-1 border-l border-border pl-2">
            {server.databases.map((database, dbIndex) => (
              <div key={dbIndex}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-7 px-2"
                  onClick={() => toggleItem(`db-${serverIndex}-${dbIndex}`)}
                >
                  {expandedItems[`db-${serverIndex}-${dbIndex}`] ? 
                    <ChevronDown className="h-3 w-3 mr-1" /> : 
                    <ChevronRight className="h-3 w-3 mr-1" />
                  }
                  <Database className="h-3 w-3 mr-2 text-blue-500" />
                  <span className="text-sm flex-1 text-left">{database.name}</span>
                </Button>
                
                {expandedItems[`db-${serverIndex}-${dbIndex}`] && (
                  <div className="ml-4 space-y-1">
                    {database.tables.map((table, tableIndex) => (
                      <Button
                        key={tableIndex}
                        variant="ghost"
                        className="w-full justify-start h-6 px-2"
                      >
                        <Table className="h-3 w-3 mr-2 text-muted-foreground" />
                        <span className="text-xs flex-1 text-left">{table}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="p-4">
      <h3 className="font-semibold text-sm mb-3">DATABASE BROWSER</h3>
      <ScrollArea className="h-96">
        <div className="space-y-1">
          {renderTree()}
        </div>
      </ScrollArea>
    </div>
  )
}