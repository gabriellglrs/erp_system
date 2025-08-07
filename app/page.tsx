"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, Users, Package, DollarSign, TrendingUp, ShoppingCart, FileText, Bell, Calendar, Plus, Search, Filter, Download, User, Hash } from 'lucide-react'

// Tipos de dados
interface Cliente {
    id: number
    nome: string
    email: string
    telefone: string
    endereco: string
    totalCompras: number
}

interface Produto {
    id: number
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoria: string
}

interface Venda {
    id: number
    clienteId: number
    produtoId: number
    quantidade: number
    valor: number
    data: string
    status: string
}

interface ContaReceber {
    id: number
    clienteId: number
    valor: number
    dataVencimento: string
    status: "Pago" | "Pendente" | "Vencido"
    descricao: string
}

interface ContaPagar {
    id: number
    fornecedor: string
    valor: number
    dataVencimento: string
    status: "Pago" | "Pendente" | "Vencido"
    categoria: string
}

export default function ERPSystem() {
    // Estados para dados mockados
    const [clientes, setClientes] = useState<Cliente[]>([
        { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-9999", endereco: "Rua A, 123", totalCompras: 2500 },
        { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 88888-8888", endereco: "Rua B, 456", totalCompras: 1800 },
        { id: 3, nome: "Pedro Costa", email: "pedro@email.com", telefone: "(11) 77777-7777", endereco: "Rua C, 789", totalCompras: 3200 }
    ])

    const [produtos, setProdutos] = useState<Produto[]>([
        { id: 1, nome: "Produto A", descricao: "Descrição do produto A", preco: 150, estoque: 50, categoria: "Categoria 1" },
        { id: 2, nome: "Produto B", descricao: "Descrição do produto B", preco: 200, estoque: 30, categoria: "Categoria 2" },
        { id: 3, nome: "Produto C", descricao: "Descrição do produto C", preco: 100, estoque: 80, categoria: "Categoria 1" }
    ])

    const [vendas, setVendas] = useState<Venda[]>([
        { id: 1, clienteId: 1, produtoId: 1, quantidade: 2, valor: 300, data: "2024-01-15", status: "Concluída" },
        { id: 2, clienteId: 2, produtoId: 2, quantidade: 1, valor: 200, data: "2024-01-16", status: "Concluída" },
        { id: 3, clienteId: 3, produtoId: 3, quantidade: 3, valor: 300, data: "2024-01-17", status: "Pendente" }
    ])

    const [contasReceber, setContasReceber] = useState<ContaReceber[]>([
        { id: 1, clienteId: 1, valor: 500, dataVencimento: "2024-02-15", status: "Pendente", descricao: "Venda de produtos" },
        { id: 2, clienteId: 2, valor: 300, dataVencimento: "2024-02-10", status: "Pago", descricao: "Serviço prestado" },
        { id: 3, clienteId: 3, valor: 800, dataVencimento: "2024-01-30", status: "Vencido", descricao: "Venda parcelada" }
    ])

    const [contasPagar, setContasPagar] = useState<ContaPagar[]>([
        { id: 1, fornecedor: "Fornecedor A", valor: 1200, dataVencimento: "2024-02-20", status: "Pendente", categoria: "Matéria Prima" },
        { id: 2, fornecedor: "Energia Elétrica", valor: 450, dataVencimento: "2024-02-05", status: "Pago", categoria: "Utilidades" },
        { id: 3, fornecedor: "Aluguel", valor: 2000, dataVencimento: "2024-02-01", status: "Pendente", categoria: "Fixas" }
    ])

    // Estados para formulários
    const [novoCliente, setNovoCliente] = useState({ nome: "", email: "", telefone: "", endereco: "" })
    const [novoProduto, setNovoProduto] = useState({ nome: "", descricao: "", preco: "", estoque: "", categoria: "" })
    const [novaVenda, setNovaVenda] = useState({ clienteId: "", produtoId: "", quantidade: "" })

    // Funções para adicionar dados
    const adicionarCliente = () => {
        if (novoCliente.nome && novoCliente.email) {
            const cliente: Cliente = {
                id: clientes.length + 1,
                ...novoCliente,
                totalCompras: 0
            }
            setClientes([...clientes, cliente])
            setNovoCliente({ nome: "", email: "", telefone: "", endereco: "" })
        }
    }

    const adicionarProduto = () => {
        if (novoProduto.nome && novoProduto.preco) {
            const produto: Produto = {
                id: produtos.length + 1,
                nome: novoProduto.nome,
                descricao: novoProduto.descricao,
                preco: parseFloat(novoProduto.preco),
                estoque: parseInt(novoProduto.estoque),
                categoria: novoProduto.categoria
            }
            setProdutos([...produtos, produto])
            setNovoProduto({ nome: "", descricao: "", preco: "", estoque: "", categoria: "" })
        }
    }

    const adicionarVenda = () => {
        if (novaVenda.clienteId && novaVenda.produtoId && novaVenda.quantidade) {
            const produto = produtos.find(p => p.id === parseInt(novaVenda.produtoId))
            if (produto) {
                const venda: Venda = {
                    id: vendas.length + 1,
                    clienteId: parseInt(novaVenda.clienteId),
                    produtoId: parseInt(novaVenda.produtoId),
                    quantidade: parseInt(novaVenda.quantidade),
                    valor: produto.preco * parseInt(novaVenda.quantidade),
                    data: new Date().toISOString().split('T')[0],
                    status: "Concluída"
                }
                setVendas([...vendas, venda])
                setNovaVenda({ clienteId: "", produtoId: "", quantidade: "" })
            }
        }
    }

    // Cálculos para dashboard
    const totalVendas = vendas.reduce((acc, venda) => acc + venda.valor, 0)
    const totalContasReceber = contasReceber.filter(c => c.status !== "Pago").reduce((acc, conta) => acc + conta.valor, 0)
    const totalContasPagar = contasPagar.filter(c => c.status !== "Pago").reduce((acc, conta) => acc + conta.valor, 0)
    const fluxoCaixa = totalVendas - totalContasPagar

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">ERP Simplificado</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4 mr-2" />
                                Notificações
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Relatórios
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs defaultValue="dashboard" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="clientes">Clientes</TabsTrigger>
                        <TabsTrigger value="produtos">Produtos</TabsTrigger>
                        <TabsTrigger value="vendas">Vendas</TabsTrigger>
                        <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                        <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
                    </TabsList>

                    {/* Dashboard */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">R$ {totalVendas.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">R$ {totalContasReceber.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{contasReceber.filter(c => c.status !== "Pago").length} contas pendentes</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Contas a Pagar</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">R$ {totalContasPagar.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{contasPagar.filter(c => c.status !== "Pago").length} contas pendentes</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
                                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-2xl font-bold ${fluxoCaixa >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        R$ {fluxoCaixa.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Saldo atual</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vendas Recentes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {vendas.slice(-5).map((venda) => {
                                            const cliente = clientes.find(c => c.id === venda.clienteId)
                                            const produto = produtos.find(p => p.id === venda.produtoId)
                                            return (
                                                <div key={venda.id} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{cliente?.nome}</p>
                                                        <p className="text-sm text-muted-foreground">{produto?.nome}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">R$ {venda.valor}</p>
                                                        <Badge variant={venda.status === "Concluída" ? "default" : "secondary"}>
                                                            {venda.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Produtos com Estoque Baixo</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {produtos.filter(p => p.estoque < 40).map((produto) => (
                                            <div key={produto.id} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{produto.nome}</p>
                                                    <p className="text-sm text-muted-foreground">{produto.categoria}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant={produto.estoque < 20 ? "destructive" : "secondary"}>
                                                        {produto.estoque} unidades
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Clientes */}
                    <TabsContent value="clientes" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Gestão de Clientes</h2>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Novo Cliente
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>Cadastrar Cliente</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="nome">Nome</Label>
                                        <Input
                                            id="nome"
                                            value={novoCliente.nome}
                                            onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={novoCliente.email}
                                            onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input
                                            id="telefone"
                                            value={novoCliente.telefone}
                                            onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="endereco">Endereço</Label>
                                        <Textarea
                                            id="endereco"
                                            value={novoCliente.endereco}
                                            onChange={(e) => setNovoCliente({ ...novoCliente, endereco: e.target.value })}
                                        />
                                    </div>
                                    <Button onClick={adicionarCliente} className="w-full">
                                        Cadastrar Cliente
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Lista de Clientes</CardTitle>
                                    <div className="flex space-x-2">
                                        <Input placeholder="Buscar cliente..." className="max-w-sm" />
                                        <Button variant="outline" size="icon">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>E-mail</TableHead>
                                                <TableHead>Telefone</TableHead>
                                                <TableHead>Total Compras</TableHead>
                                                <TableHead>Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {clientes.map((cliente) => (
                                                <TableRow key={cliente.id}>
                                                    <TableCell className="font-medium">{cliente.nome}</TableCell>
                                                    <TableCell>{cliente.email}</TableCell>
                                                    <TableCell>{cliente.telefone}</TableCell>
                                                    <TableCell>R$ {cliente.totalCompras.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm">Editar</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Produtos */}
                    <TabsContent value="produtos" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Gestão de Produtos</h2>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Novo Produto
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>Cadastrar Produto</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="nomeProduto">Nome</Label>
                                        <Input
                                            id="nomeProduto"
                                            value={novoProduto.nome}
                                            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="descricao">Descrição</Label>
                                        <Textarea
                                            id="descricao"
                                            value={novoProduto.descricao}
                                            onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="preco">Preço</Label>
                                        <Input
                                            id="preco"
                                            type="number"
                                            value={novoProduto.preco}
                                            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="estoque">Estoque</Label>
                                        <Input
                                            id="estoque"
                                            type="number"
                                            value={novoProduto.estoque}
                                            onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="categoria">Categoria</Label>
                                        <Input
                                            id="categoria"
                                            value={novoProduto.categoria}
                                            onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                                        />
                                    </div>
                                    <Button onClick={adicionarProduto} className="w-full">
                                        Cadastrar Produto
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Lista de Produtos</CardTitle>
                                    <div className="flex space-x-2">
                                        <Input placeholder="Buscar produto..." className="max-w-sm" />
                                        <Button variant="outline" size="icon">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Categoria</TableHead>
                                                <TableHead>Preço</TableHead>
                                                <TableHead>Estoque</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {produtos.map((produto) => (
                                                <TableRow key={produto.id}>
                                                    <TableCell className="font-medium">{produto.nome}</TableCell>
                                                    <TableCell>{produto.categoria}</TableCell>
                                                    <TableCell>R$ {produto.preco.toLocaleString()}</TableCell>
                                                    <TableCell>{produto.estoque}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={produto.estoque > 20 ? "default" : produto.estoque > 10 ? "secondary" : "destructive"}>
                                                            {produto.estoque > 20 ? "Em estoque" : produto.estoque > 10 ? "Estoque baixo" : "Crítico"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm">Editar</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Vendas */}
                    <TabsContent value="vendas" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Gestão de Vendas</h2>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Nova Venda
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>Registrar Venda</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="cliente">Cliente</Label>
                                        <Select value={novaVenda.clienteId} onValueChange={(value) => setNovaVenda({ ...novaVenda, clienteId: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um cliente" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clientes.map((cliente) => (
                                                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                                        {cliente.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="produto">Produto</Label>
                                        <Select value={novaVenda.produtoId} onValueChange={(value) => setNovaVenda({ ...novaVenda, produtoId: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um produto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {produtos.map((produto) => (
                                                    <SelectItem key={produto.id} value={produto.id.toString()}>
                                                        {produto.nome} - R$ {produto.preco}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="quantidade">Quantidade</Label>
                                        <Input
                                            id="quantidade"
                                            type="number"
                                            value={novaVenda.quantidade}
                                            onChange={(e) => setNovaVenda({ ...novaVenda, quantidade: e.target.value })}
                                        />
                                    </div>
                                    {novaVenda.produtoId && novaVenda.quantidade && (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-muted-foreground">Total da venda:</p>
                                            <p className="text-2xl font-bold">
                                                R$ {(produtos.find(p => p.id === parseInt(novaVenda.produtoId))?.preco || 0) * parseInt(novaVenda.quantidade || "0")}
                                            </p>
                                        </div>
                                    )}
                                    <Button onClick={adicionarVenda} className="w-full">
                                        Registrar Venda
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Histórico de Vendas</CardTitle>
                                    <div className="flex space-x-2">
                                        <Input placeholder="Buscar venda..." className="max-w-sm" />
                                        <Button variant="outline" size="icon">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Data</TableHead>
                                                <TableHead>Cliente</TableHead>
                                                <TableHead>Produto</TableHead>
                                                <TableHead>Quantidade</TableHead>
                                                <TableHead>Valor</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {vendas.map((venda) => {
                                                const cliente = clientes.find(c => c.id === venda.clienteId)
                                                const produto = produtos.find(p => p.id === venda.produtoId)
                                                return (
                                                    <TableRow key={venda.id}>
                                                        <TableCell>{new Date(venda.data).toLocaleDateString()}</TableCell>
                                                        <TableCell>{cliente?.nome}</TableCell>
                                                        <TableCell>{produto?.nome}</TableCell>
                                                        <TableCell>{venda.quantidade}</TableCell>
                                                        <TableCell>R$ {venda.valor.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={venda.status === "Concluída" ? "default" : "secondary"}>
                                                                {venda.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="outline" size="sm">
                                                                <FileText className="h-4 w-4 mr-1" />
                                                                Recibo
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Financeiro */}
                    <TabsContent value="financeiro" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Gestão Financeira</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Conta a Receber
                                </Button>
                                <Button variant="outline">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Conta a Pagar
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">R$ {totalContasReceber.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{contasReceber.filter(c => c.status !== "Pago").length} contas pendentes</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">R$ {totalContasPagar.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{contasPagar.filter(c => c.status !== "Pago").length} contas pendentes</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Saldo Projetado</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-2xl font-bold ${(totalContasReceber - totalContasPagar) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        R$ {(totalContasReceber - totalContasPagar).toLocaleString()}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Receber - Pagar</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contas a Receber</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Cliente</TableHead>
                                                <TableHead>Valor</TableHead>
                                                <TableHead>Vencimento</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {contasReceber.map((conta) => {
                                                const cliente = clientes.find(c => c.id === conta.clienteId)
                                                return (
                                                    <TableRow key={conta.id}>
                                                        <TableCell>{cliente?.nome}</TableCell>
                                                        <TableCell>R$ {conta.valor.toLocaleString()}</TableCell>
                                                        <TableCell>{new Date(conta.dataVencimento).toLocaleDateString()}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={
                                                                conta.status === "Pago" ? "default" :
                                                                    conta.status === "Vencido" ? "destructive" : "secondary"
                                                            }>
                                                                {conta.status}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Contas a Pagar</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fornecedor</TableHead>
                                                <TableHead>Valor</TableHead>
                                                <TableHead>Vencimento</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {contasPagar.map((conta) => (
                                                <TableRow key={conta.id}>
                                                    <TableCell>{conta.fornecedor}</TableCell>
                                                    <TableCell>R$ {conta.valor.toLocaleString()}</TableCell>
                                                    <TableCell>{new Date(conta.dataVencimento).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={
                                                            conta.status === "Pago" ? "default" :
                                                                conta.status === "Vencido" ? "destructive" : "secondary"
                                                        }>
                                                            {conta.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Relatórios */}
                    <TabsContent value="relatorios" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Relatórios e Análises</h2>
                            <Button>
                                <Download className="h-4 w-4 mr-2" />
                                Exportar Relatórios
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vendas por Período</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Este mês</span>
                                            <span className="font-bold">R$ {totalVendas.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Mês anterior</span>
                                            <span className="font-bold">R$ 2.100</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                            <span>Crescimento</span>
                                            <span className="font-bold">+20.1%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Produtos Mais Vendidos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {produtos.slice(0, 3).map((produto, index) => (
                                            <div key={produto.id} className="flex justify-between">
                                                <span>{index + 1}. {produto.nome}</span>
                                                <span className="font-bold">{Math.floor(Math.random() * 50) + 10} vendas</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Clientes Mais Ativos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {clientes.slice(0, 3).map((cliente, index) => (
                                            <div key={cliente.id} className="flex justify-between">
                                                <span>{index + 1}. {cliente.nome}</span>
                                                <span className="font-bold">R$ {cliente.totalCompras.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Análise de Estoque</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Produtos em estoque</span>
                                            <span className="font-bold">{produtos.filter(p => p.estoque > 20).length}</span>
                                        </div>
                                        <div className="flex justify-between text-yellow-600">
                                            <span>Estoque baixo</span>
                                            <span className="font-bold">{produtos.filter(p => p.estoque <= 20 && p.estoque > 10).length}</span>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <span>Estoque crítico</span>
                                            <span className="font-bold">{produtos.filter(p => p.estoque <= 10).length}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Situação Financeira</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-green-600">
                                            <span>A receber</span>
                                            <span className="font-bold">R$ {totalContasReceber.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <span>A pagar</span>
                                            <span className="font-bold">R$ {totalContasPagar.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <span>Saldo projetado</span>
                                            <span className={totalContasReceber - totalContasPagar >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                R$ {(totalContasReceber - totalContasPagar).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resumo Geral</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Total de clientes</span>
                                            <span className="font-bold">{clientes.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total de produtos</span>
                                            <span className="font-bold">{produtos.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Vendas realizadas</span>
                                            <span className="font-bold">{vendas.length}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            
            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                            <span className="text-sm text-gray-600">ERP Simplificado © 2025</span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium">Aluno:</span>
                                <span>Gabriel Lucas Rodrigues Souza</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Hash className="h-4 w-4" />
                                <span className="font-medium">RU:</span>
                                <span>4256176</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}